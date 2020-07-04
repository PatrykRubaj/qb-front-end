using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class GoogleSpreadsheetService
    {
        private readonly Spreadsheet _spreadsheet;
        private readonly Budget _budget;

        public GoogleSpreadsheetService(Budget budget)
        {
            _spreadsheet = new Spreadsheet();
            _budget = budget;
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
            properties.Title = "Your Quantum Budget for March";
            properties.Locale = _budget.Country.Key.ToLower();
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
            var chartsSheetService = new ChartsSheetService(_budget);
            var dashboardSheet = chartsSheetService.GetSheet();
            this.AddSheet(dashboardSheet);
        }

        public Spreadsheet GetSpreadsheet() => _spreadsheet;
    }
}