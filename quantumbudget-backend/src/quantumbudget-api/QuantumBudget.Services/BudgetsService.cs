using System;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Threading.Tasks;
using QuantumBudget.Model.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace QuantumBudget.Services
{
    public interface IBudgetsService
    {
        Task Add(Budget budget);
        Task<Budget> GetByUserId(string userId);
        Task Update(Budget budget);
    }

    public class BudgetsService : IBudgetsService
    {
        private readonly IMongoCollection<Budget> _budgets;
        private readonly ILogger<BudgetsService> _log;
        private readonly IBudgetsDatabaseSettings _settings;

        public BudgetsService(IBudgetsDatabaseSettings settings, ILogger<BudgetsService> log)
        {
            _log = log;
            _settings = settings;

            try
            {
                MongoClientSettings otherSettings = MongoClientSettings.FromUrl(
                    new MongoUrl(_settings.MongoDBConnectionString)
                );
                
                otherSettings.SslSettings = 
                    new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
                
                var client = new MongoClient(otherSettings);
                var database = client.GetDatabase(_settings.DatabaseName);

                _budgets = database.GetCollection<Budget>(_settings.BudgetsCollectionName);
            }
            catch (Exception e)
            {
                _log.LogError($"Exploded: {JsonConvert.SerializeObject(_settings)}");
                throw;
            }
        }

        public async Task<Budget> GetByUserId(string userId)
        {
            var budgets = await _budgets.FindAsync(x => x.UserId == userId);
            return await budgets?.FirstOrDefaultAsync();
        }

        public async Task Add(Budget budget)
        {
            await _budgets.InsertOneAsync(budget);
        }

        public async Task Update(Budget budget)
        {
            var retrived = await GetByUserId(budget.UserId);

            if (retrived != null)
            {
                budget.Id = retrived.Id;
                await _budgets.ReplaceOneAsync<Budget>(x => x.Id == retrived.Id, budget);
            }
            else
            {
                await Add(budget);
            }
        }
    }
}