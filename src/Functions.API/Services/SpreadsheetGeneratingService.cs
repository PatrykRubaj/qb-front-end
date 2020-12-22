using System;
using System.Collections.Generic;
using System.Linq;
using Functions.Model.DTOs.BudgetData;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;

namespace Services
{
    public class SpreadsheetGeneratingService
    {
        private readonly GoogleSpreadsheetService _googleSpreadsheetService;
        
        public SpreadsheetGeneratingService(GoogleSpreadsheetService googleSpreadsheetService)
        {
            _googleSpreadsheetService = googleSpreadsheetService;
        }

        public Spreadsheet Generate(Budget budget)
        {
            return _googleSpreadsheetService.GetSpreadsheet(budget);
        }

    }
}