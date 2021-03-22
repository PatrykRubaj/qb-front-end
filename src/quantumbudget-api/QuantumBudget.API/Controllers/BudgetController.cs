using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using QuantumBudget.Model.DTOs;
using System.Text;
using System.Linq;
using QuantumBudget.Model.DTOs.Mailchimp;
using QuantumBudget.Model.Models;
using QuantumBudget.Services;
using QuantumBudget.Model.DTOs.BudgetData;
using QuantumBudget.Model.DTOs.Auth0;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;
using QuantumBudget.Services.Mailchimp;

namespace QuantumBudget.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class BudgetController : Controller
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<BudgetController> _log;
        private readonly IUserManagementService _userManagementService;
        private readonly SpreadsheetGeneratingService _spreadsheetGeneratingService;
        private BudgetDto _budget;
        private readonly IBudgetsService _budgetsService;
        private readonly JwtToken _jwtToken;
        private readonly GoogleAuthService _googleAuthService;
        private readonly IMemoryCache _memoryCache;
        private readonly SubscriberService _subscriberService;

        public BudgetController(IHttpClientFactory clientFactory,
            ILogger<BudgetController> log,
            IUserManagementService userManagementService,
            SpreadsheetGeneratingService spreadsheetGeneratingService,
            IBudgetsService budgetsService,
            JwtToken jwtToken,
            GoogleAuthService googleAuthService,
            IMemoryCache memoryCache,
            SubscriberService subscriberService)
        {
            _clientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
            _log = log ?? throw new ArgumentNullException(nameof(log));
            _userManagementService =
                userManagementService ?? throw new ArgumentNullException(nameof(userManagementService));
            _spreadsheetGeneratingService = spreadsheetGeneratingService ??
                                            throw new ArgumentNullException(nameof(spreadsheetGeneratingService));
            _budgetsService = budgetsService ?? throw new ArgumentNullException(nameof(budgetsService));
            _jwtToken = jwtToken;
            _googleAuthService = googleAuthService ?? throw new ArgumentNullException(nameof(googleAuthService));
            _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
            _subscriberService = subscriberService ?? throw new ArgumentNullException(nameof(subscriberService));
        }

        [HttpGet("{userId}")]
        [Authorize("budget:read")]
        public async Task<ActionResult<Budget>> Get(string userId)
        {
            if (_jwtToken.UserId == userId)
            {
                var budget = await _budgetsService.GetByUserId(userId);

                if (budget != null)
                {
                    return budget;
                }

                return NotFound();
            }

            return Unauthorized();
        }

        [HttpPost]
        [Authorize("budget:generate")]
        public async Task<IActionResult> Generate([FromBody] BudgetDto input)
        {
            _budget = input;

            if (_jwtToken.UserId == null)
            {
                return Unauthorized();
            }

            _log.LogInformation($"Budget: {JsonConvert.SerializeObject(_budget)}");

            var auth0User = await _userManagementService.GetAuth0UserAsync(_jwtToken.UserId);

            if (_budget.User.AgreedToNewsletter)
            {
                if (!string.IsNullOrEmpty(auth0User.Email))
                {
                    await _subscriberService.HandleMemberSubscriptionAsync(new NewSubscriberDto()
                    {
                        Email = auth0User.Email,
                        Name = auth0User?.GivenName ?? "",
                        Source = "MVP-Generator",
                    });
                }
            }

            await SaveBudgetAsync(_jwtToken.UserId);

            _log.LogInformation($"Auth0User: {JsonConvert.SerializeObject(auth0User)}");

            CleanUpTheData(_budget);
            var googleSpreadsheet = GetRequestJsonForGoogle();
            string googleResponse = await CreateSpreadsheet(auth0User, googleSpreadsheet);

            return Ok(googleResponse);
        }

        private async Task SaveBudgetAsync(string userId)
        {
            var budgetToSend = MapBudget(_budget);
            budgetToSend.UserId = userId;
            
            await _budgetsService.Update(budgetToSend);
        }

        private Model.Models.Budget MapBudget(Model.DTOs.BudgetData.BudgetDto oldBudget)
        {
            var budget = new QuantumBudget.Model.Models.Budget();
            var incomes = new List<QuantumBudget.Model.Models.Income>();
            var categories = new List<QuantumBudget.Model.Models.Category>();
            var subcategories = new List<QuantumBudget.Model.Models.Subcategory>();

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
            budget.User = new Model.Models.User()
            {
                AgreedToNewsletter = _budget.User.AgreedToNewsletter,
                AgreedToPrivacyPolicy = _budget.User.AgreedToPrivacyPolicy,
                AgreedToTermsOfService = _budget.User.AgreedToTermsOfService,
            };

            return budget;
        }

        private Model.Models.Category MapCategory(Model.DTOs.BudgetData.CategoryDto category)
        {
            return new Category()
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                Status = (Model.Models.EntityStatus) ((int) category.Status)
            };
        }

        private Model.Models.Subcategory MapSubcategory(
            Model.DTOs.BudgetData.SubcategoryDto subcategory)
        {
            return new Subcategory()
            {
                Id = subcategory.Id.ToString(),
                Name = subcategory.Name,
                Amount = subcategory.Amount,
                CategoryId = subcategory.CategoryId.ToString(),
                Status = (Model.Models.EntityStatus) ((int) subcategory.Status)
            };
        }

        private Model.Models.Income MapIncome(Model.DTOs.BudgetData.IncomeDto income)
        {
            return new Income()
            {
                Id = income.Id.ToString(),
                Name = income.Name,
                Amount = income.Amount ?? 0,
                Status = (Model.Models.EntityStatus) ((int) income.Status)
            };
        }

        private Model.Models.Country MapCountry(Model.DTOs.BudgetData.CountryDto country)
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

        private void CleanUpTheData(BudgetDto budget)
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

        private async Task<string> CreateSpreadsheet(Auth0UserDto user, dynamic json)
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

            if (httpResponse.IsSuccessStatusCode)
            {
                var responseAsString = await httpResponse.Content.ReadAsStringAsync();

                return responseAsString;
            }

            if (httpResponse.StatusCode == HttpStatusCode.Unauthorized)
            {
                var refreshedUser = await _googleAuthService.GetNewAccessTokenAsync(user);
                if (_memoryCache.TryGetValue(user.UserId, out Auth0UserDto cachedUser))
                {
                    _memoryCache.Remove(user.UserId);
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(
                        TimeSpan.FromSeconds(refreshedUser.Identities.FirstOrDefault()?.ExpiresIn ?? 0));

                // Save data in cache.
                _memoryCache.Set(user.UserId, user, cacheEntryOptions);
                return await CreateSpreadsheet(refreshedUser, json);
            }

            return null;
        }

        private Google.Apis.Sheets.v4.Data.Spreadsheet GetRequestJsonForGoogle()
        {
            return _spreadsheetGeneratingService.Generate(_budget);
        }
    }
}