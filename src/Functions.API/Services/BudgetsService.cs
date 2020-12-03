using System.Collections.Generic;
using System.Threading.Tasks;
using Functions.Model.Models;
using MongoDB.Driver;

namespace Services
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

        public BudgetsService(IBudgetsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.MongoDBConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _budgets = database.GetCollection<Budget>(settings.BudgetsCollectionName);
        }

        public async Task<Budget> GetByUserId(string userId)
        {
            var budgets = await _budgets.FindAsync<Budget>(x => x.UserId == userId);
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
                await _budgets.ReplaceOneAsync<Budget>(x => x.Id == retrived.Id, budget);
            }
            else
            {
                await Add(budget);
            }
        }
    }
}