using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using DTO;
using System.Text;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Services;
using System.Linq;
using DTO.BudgetData;
using Services;

namespace QuantumBudget.Auth
{
    public class GetAccessToken
    {
        private readonly IHttpClientFactory _clientFactory;
        private Budget _budget;

        public GetAccessToken(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [FunctionName("GetAccessToken")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();

            bool gotValue = req.Headers.TryGetValue("Authorization", out var accessToken);

            if (accessToken.FirstOrDefault() == null)
            {
                return new ObjectResult("Please go away")
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }

            _budget = JsonConvert.DeserializeObject<Budget>(content);
            log.LogInformation($"Budget: {JsonConvert.SerializeObject(_budget)}");
            var userInfo = await GetUserInfo(accessToken.FirstOrDefault());
            log.LogInformation($"UserInfo: {JsonConvert.SerializeObject(userInfo)}");
            var managementApiToken = await GetManagementToken();
            var auth0User = await GetAuth0User(userInfo.UserId, managementApiToken.AccessToken);
            log.LogInformation($"Auth0User: {JsonConvert.SerializeObject(auth0User)}");

            var googleSpreadsheet = GetRequestJsonForGoogle();
            log.LogInformation($"Json for Google: {googleSpreadsheet}");
            string googleRespone = await CreateSpreadsheet(auth0User, googleSpreadsheet);

            return new OkObjectResult(googleRespone);
        }

        private async Task<Auth0User> GetAuth0User(string userId, string token)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            using var httpResponse = await client.GetAsync($"https://quantumbudget.eu.auth0.com/api/v2/users/{userId}");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var auth0User = JsonConvert.DeserializeObject<Auth0User>(responseAsString);
            return auth0User;
        }

        private async Task<UserInfo> GetUserInfo(string userAccessToken)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"{userAccessToken}");
            using var httpResponse = await client.GetAsync($"https://quantumbudget.eu.auth0.com/userinfo");
            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<UserInfo>(responseAsString);

            return userInfo;
        }

        private async Task<TokenResponse> GetManagementToken()
        {
            var tokenRequest = new TokenRequest()
            {
                ClientId = "pSnOoOn5NcRTjhMTpewokO5p06gGuXkc",
                ClientSecret = "xU7p8QtSL54Yo5gZzLhwbArn-RLDUFz6-Dn036BwihHVy1rC-0nyPXMBGxqdH5OY",
                Audience = "https://quantumbudget.eu.auth0.com/api/v2/",
                GrantType = "client_credentials"
            };
            var tokenRequestJson = new StringContent(JsonConvert.SerializeObject(tokenRequest), Encoding.UTF8, "application/json");

            var client = _clientFactory.CreateClient();
            using var httpResponse = await client.PostAsync("https://quantumbudget.eu.auth0.com/oauth/token", tokenRequestJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();
            var authToken = JsonConvert.DeserializeObject<TokenResponse>(responseAsString);

            return authToken;
        }

        private async Task<string> CreateSpreadsheet(Auth0User user, dynamic json)
        {
            var spreadsheetJson = new StringContent(JsonConvert.SerializeObject(json, Formatting.Indented, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            }), Encoding.UTF8, "application/json");

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {user.Identities.FirstOrDefault(x => x.Provider == "google-oauth2")?.AccessToken}");
            using var httpResponse = await client.PostAsync("https://sheets.googleapis.com/v4/spreadsheets", spreadsheetJson);

            var responseAsString = await httpResponse.Content.ReadAsStringAsync();

            return responseAsString;
        }

        private async Task<bool> CreateSpreadsheet(string googleAccessToken)
        {
            // var baseClientService = new BaseClientService.Initializer();
            // baseClientService.Y

            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                ApplicationName = "Quantum Budget",
            });
            return false;
        }

        private Google.Apis.Sheets.v4.Data.Spreadsheet GetRequestJsonForGoogle()
        {
            var service = new SpreadsheetGeneratingService(_budget);

            return service.Generate();
        }
    }
}
