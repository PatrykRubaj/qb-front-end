using System;
using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class SpendingSheetService
    {
        private readonly Budget _budget;
        private readonly GoogleSheetService _googleSheetService;

        public SpendingSheetService(Budget budget)
        {
            _googleSheetService = new GoogleSheetService();
            _budget = budget;
        }

        private void AddSpendingHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Budget"
                }
            });

            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Budget Plan"
                }
            });
            _googleSheetService.AddRow(cells);
        }

        private void AddIncomesSection(IList<Income> incomes)
        {
            foreach (var income in incomes)
            {
                var cells = new List<CellData>();
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        StringValue = income.Name
                    }
                });
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        NumberValue = Convert.ToDouble(income.Amount)
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        }
                    }
                });
                _googleSheetService.AddRow(cells);
            }
        }

        private void AddCategoriesSections(IList<Category> categories, IList<Subcategory> subcategories)
        {
            foreach (var category in categories)
            {
                AddCategorySection(category.Name, subcategories.Where(x => x.CategoryId == category.Id));
            }
        }

        private void AddCategorySection(string categoryName, IEnumerable<Subcategory> subcategories)
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = categoryName
                }
            });
            _googleSheetService.AddRow(cells);

            foreach (var sub in subcategories)
            {
                var subCells = new List<CellData>();
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        StringValue = sub.Name
                    }
                });
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        NumberValue = Convert.ToDouble(sub.Amount)
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        }
                    }
                });
                _googleSheetService.AddRow(subCells);
            }
        }

        public Sheet GetSheet()
        {
            AddSpendingHeader();
            AddIncomesSection(_budget.Incomes);
            AddCategoriesSections(_budget.Categories, _budget.Subcategories);
            return _googleSheetService.GetSheet();
        }
    }
}