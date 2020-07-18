using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;

namespace Services
{
    public class GoogleSpreadsheetService
    {
        private readonly Spreadsheet _spreadsheet;
        private readonly Budget _budget;
        private readonly ILogger _log;

        public GoogleSpreadsheetService(Budget budget, ILogger log)
        {
            _spreadsheet = new Spreadsheet();
            _budget = budget;
            _log = log;
            if (_spreadsheet.Sheets == null)
            {
                _spreadsheet.Sheets = new List<Sheet>();
            }

            SetDefaults();
            AddSpendingSheet();
            AddDashboardSheet();
            AddChartsSheet();
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

        public Spreadsheet GetSpreadsheet() => _spreadsheet;
    }
}