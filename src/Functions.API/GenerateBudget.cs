using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using Functions.Model.DTOs;
using System.Text;
using System.Linq;
using Functions.Model.DTOs.Mailchimp;
using Functions.Model.Models;
using Services;
using Budget = Functions.Model.DTOs.BudgetData.Budget;

namespace Functions.API
{
    public class GenerateBudget
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<GenerateBudget> _log;
        private readonly QueueMessageService<NewSubscriber> _mailSubscriptionsMessageService;
        private readonly QueueMessageService<Functions.Model.Models.Budget> _budgetPersistenceMessageService;
        private readonly JwtBearerValidation _tokenValidationService;
        private readonly UserManagementService _userManagementService;
        private readonly SpreadsheetGeneratingService _spreadsheetGeneratingService;
        private Budget _budget;

        public GenerateBudget(IHttpClientFactory clientFactory, 
            ILogger<GenerateBudget> log, 
            QueueMessageService<NewSubscriber> mailSubscriptionsMessageService,
            QueueMessageService<Functions.Model.Models.Budget> budgetPersistenceMessageService,
            JwtBearerValidation tokenValidationService,
            UserManagementService userManagementService,
            SpreadsheetGeneratingService spreadsheetGeneratingService)
        {
            _clientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
            _log = log ?? throw new ArgumentNullException(nameof(log));
            _mailSubscriptionsMessageService = mailSubscriptionsMessageService ?? throw new ArgumentNullException(nameof(mailSubscriptionsMessageService));
            _budgetPersistenceMessageService = budgetPersistenceMessageService ?? throw new ArgumentNullException(nameof(budgetPersistenceMessageService));
            _tokenValidationService = tokenValidationService ?? throw new ArgumentNullException(nameof(tokenValidationService));
            _userManagementService = userManagementService ?? throw new ArgumentNullException(nameof(userManagementService));
            _spreadsheetGeneratingService = spreadsheetGeneratingService;
        }

        [FunctionName("GenerateBudget")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)]
            HttpRequest req)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();
            req.Headers.TryGetValue("Authorization", out var accessToken);
            string userId = await _tokenValidationService.GetUserId(accessToken);
            
            if (userId == null)
            {
                return new ObjectResult("Please go away")
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }
            
            _budget = JsonConvert.DeserializeObject<Budget>(content);
            _log.LogInformation($"Budget: {JsonConvert.SerializeObject(_budget)}");
            
            var auth0User = await _userManagementService.GetAuth0User(userId);
            
            if (_budget.AgreedToNewsletter)
            {
                if (!string.IsNullOrEmpty(auth0User.Email))
                {
                    await _mailSubscriptionsMessageService.SendMessageAsync(new Functions.Model.DTOs.Mailchimp.NewSubscriber()
                    {
                        Email = auth0User.Email,
                        Name = auth0User?.GivenName ?? "",
                        Source = "MVP-Generator",
                    });
                }
            }

            await SaveBudgetAsync(userId);
            
            _log.LogInformation($"Auth0User: {JsonConvert.SerializeObject(auth0User)}");

            CleanUpTheData(_budget);
            var googleSpreadsheet = GetRequestJsonForGoogle();
            string googleRespone = await CreateSpreadsheet(auth0User, googleSpreadsheet);

            return new OkObjectResult(googleRespone);
        }

        private async Task SaveBudgetAsync(string userId)
        {
            var budgetToSend = MapBudget(_budget);
            budgetToSend.UserId = userId;
        
            await _budgetPersistenceMessageService.SendMessageAsync(budgetToSend);
        }

        private Functions.Model.Models.Budget MapBudget(Functions.Model.DTOs.BudgetData.Budget oldBudget)
        {
            var budget = new Functions.Model.Models.Budget();
            var incomes = new List<Functions.Model.Models.Income>();
            var categories = new List<Functions.Model.Models.Category>();
            var subcategories = new List<Functions.Model.Models.Subcategory>();

            foreach (var income in oldBudget.Incomes)
            {
                incomes.Add(MapIncome(income));
            }

            foreach (var category in oldBudget.Categories)
            {
                categories.Add(MapCategory(category));
            }

            foreach (var subcategory in oldBudget.Subcategories)
            {
                subcategories.Add(MapSubcategory(subcategory));
            }

            budget.Incomes = incomes;
            budget.Categories = categories;
            budget.Subcategories = subcategories;
            budget.Country = MapCountry(_budget.Country);
            budget.User = new Functions.Model.Models.User()
            {
                AgreedToNewsletter = _budget.AgreedToNewsletter,
                AgreedToPrivacyPolicy = true,
            };

            return budget;
        }

        private Functions.Model.Models.Category MapCategory(Functions.Model.DTOs.BudgetData.Category category)
        {
            return new Category()
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                Status = (EntityStatus) ((int) category.Status)
            };
        }

        private Functions.Model.Models.Subcategory MapSubcategory(
            Functions.Model.DTOs.BudgetData.Subcategory subcategory)
        {
            return new Subcategory()
            {
                Id = subcategory.Id.ToString(),
                Name = subcategory.Name,
                Amount = subcategory.Amount,
                CategoryId = subcategory.CategoryId.ToString(),
                Status = (EntityStatus) ((int) subcategory.Status)
            };
        }

        private Functions.Model.Models.Income MapIncome(Functions.Model.DTOs.BudgetData.Income income)
        {
            return new Income()
            {
                Id = income.Id.ToString(),
                Name = income.Name,
                Amount = income.Amount ?? 0,
                Status = (EntityStatus) ((int) income.Status)
            };
        }

        private Functions.Model.Models.Country MapCountry(Functions.Model.DTOs.BudgetData.Country country)
        {
            return new Country()
            {
                Key = country.Key,
                Name = country.Name,
                Currency = country.Currency,
                Language = country.Language,
                EmojiU = "",
            };
        }

        private void CleanUpTheData(Budget budget)
        {
            _budget.Categories = _budget.Categories.Where(x => String.IsNullOrEmpty(x.Name) == false).ToList();

            foreach (var subcategory in _budget.Subcategories.Where(x => String.IsNullOrEmpty(x.Name) == false))
            {
                if (subcategory.Amount == null)
                {
                    subcategory.Amount = 0;
                }
            }

            foreach (var income in _budget.Incomes.Where(x => String.IsNullOrEmpty(x.Name) == false))
            {
                if (income.Amount == null)
                {
                    income.Amount = 0;
                }
            }

            Guid[] categoriesIds = _budget.Subcategories.GroupBy(x => x.CategoryId).Select(x => x.Key).ToArray();
            _budget.Categories = _budget.Categories.Where(x => categoriesIds.Contains(x.Id)).ToList();
        }
        
        private async Task<string> CreateSpreadsheet(Auth0User user, dynamic json)
        {
            var spreadsheetJson = new StringContent(JsonConvert.SerializeObject(json, Formatting.Indented,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                }), Encoding.UTF8, "application/json");

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization",
                $"Bearer {user.Identities.FirstOrDefault(x => x.Provider == "google-oauth2")?.AccessToken}");
            using var httpResponse =
                await client.PostAsync("https://sheets.googleapis.com/v4/spreadsheets", spreadsheetJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();

            return responseAsString;
        }

        private Google.Apis.Sheets.v4.Data.Spreadsheet GetRequestJsonForGoogle()
        {
            return _spreadsheetGeneratingService.Generate(_budget);
        }
    }
}