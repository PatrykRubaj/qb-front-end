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
        private readonly Budget _budget;
        private readonly GoogleSpreadsheetService _googleSpreadsheetService;
        private readonly ILogger _log;
        public SpreadsheetGeneratingService(Budget budget, ILogger log)
        {
            _budget = budget;
            _log = log;
            _googleSpreadsheetService = new GoogleSpreadsheetService(_budget, _log);
        }

        public Spreadsheet Generate()
        {
            return _googleSpreadsheetService.GetSpreadsheet();
        }

    }
}