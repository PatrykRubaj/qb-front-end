using System.Collections.Generic;
using System.Linq;
using QuantumBudget.Model.DTOs.BudgetData;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;

namespace QuantumBudget.Services
{
    public class GoogleSpreadsheetService
    {
        private readonly Spreadsheet _spreadsheet;
        private BudgetDto _budget;
        private readonly ILogger<GoogleSpreadsheetService> _log;

        public GoogleSpreadsheetService(ILogger<GoogleSpreadsheetService> log)
        {
            _spreadsheet = new Spreadsheet();
            _log = log;
            if (_spreadsheet.Sheets == null)
            {
                _spreadsheet.Sheets = new List<Sheet>();
            }
        }

        private void SetDefaults()
        {
            var properties = new SpreadsheetProperties();
            properties.Title = $"{_budget.Month.ToString("yyyy-MM")} Quantum Budget";
            properties.Locale = $"{_budget.Country.Language.ToLower()}_{_budget.Country.Key.ToUpper()}";
            _spreadsheet.Properties = properties;
        }

        public void AddSheet(Sheet sheet)
        {
            _spreadsheet.Sheets.Add(sheet);
        }

        private void AddSpendingSheet()
        {
            var spendingSheetService = new SpendingSheetService(_budget);
            var spendingSheet = spendingSheetService.GetSheet();
            this.AddSheet(spendingSheet);
        }

        private void AddDashboardSheet()
        {
            var dashboardSheetService = new DashboardSheetService(_budget);
            var dashboardSheet = dashboardSheetService.GetSheet();
            this.AddSheet(dashboardSheet);
        }

        private void AddChartsSheet()
        {
            var chartsSheetService = new ChartsSheetService(_budget, _log);
            var dashboardSheet = chartsSheetService.GetSheet();
            this.AddSheet(dashboardSheet);
        }

        public Spreadsheet GetSpreadsheet(BudgetDto budget)
        {
            _budget = budget;
            SetDefaults();
            AddSpendingSheet();
            AddDashboardSheet();
            AddChartsSheet();
            
            return _spreadsheet;
        }
    }
}