using System;
using System.Collections.Generic;
using System.Linq;
using QuantumBudget.Model.DTOs.BudgetData;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;

namespace QuantumBudget.Services
{
    public class SpreadsheetGeneratingService
    {
        private readonly GoogleSpreadsheetService _googleSpreadsheetService;
        
        public SpreadsheetGeneratingService(GoogleSpreadsheetService googleSpreadsheetService)
        {
            _googleSpreadsheetService = googleSpreadsheetService;
        }

        public Spreadsheet Generate(BudgetDto budget)
        {
            return _googleSpreadsheetService.GetSpreadsheet(budget);
        }

    }
}