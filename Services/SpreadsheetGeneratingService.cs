using System;
using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class SpreadsheetGeneratingService
    {
        private readonly Budget _budget;
        private readonly GoogleSpreadsheetService _googleSpreadsheetService;
        public SpreadsheetGeneratingService(Budget budget)
        {
            _budget = budget;
            _googleSpreadsheetService = new GoogleSpreadsheetService(_budget);
        }

        public Spreadsheet Generate()
        {
            return _googleSpreadsheetService.GetSpreadsheet();
        }

    }
}