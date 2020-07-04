using System;
using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class ChartsSheetService
    {
        private readonly Budget _budget;
        private readonly GoogleSheetService _googleSheetService;

        public ChartsSheetService(Budget budget)
        {
            _budget = budget ?? throw new ArgumentNullException(nameof(budget));

            int rowsNumber = 5 + _budget.Categories.Count + 54;
            int colsNumber = 10;

            _googleSheetService = new GoogleSheetService("Charts", 2, rowsNumber, colsNumber, 0, 2, true, GetSheetsColor());
            _googleSheetService.SetRowHeight(0, 50);
        }

        private Color GetSheetsColor() => new Color()
        {
            Alpha = 1,
            Red = (float)0xf9 / 256,
            Green = (float)0xcb / 256,
            Blue = (float)0x9c / 256
        };

        private void AddChartsHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Charts"
                },
                UserEnteredFormat = new CellFormat()
                {
                    BackgroundColor = GetSheetsColor(),
                    TextFormat = new TextFormat()
                    {
                        FontSize = 18,
                        Bold = true,

                    },
                    VerticalAlignment = "MIDDLE",
                    HorizontalAlignment = "CENTER"
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Category"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Spent"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            _googleSheetService.AddRow(cells);

            _googleSheetService.MergeRange(new GridRange()
            {
                StartRowIndex = 0,
                EndRowIndex = 1,
                StartColumnIndex = 0,
                EndColumnIndex = 7
            });
        }

        private void AddCategoryRow(Category category)
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(0, category.RowIndex)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }

            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(2, category.RowIndex + 2)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            _googleSheetService.AddRow(cells);
        }

        private void AddCategoriesTable(IList<Category> categories, IList<Subcategory> subcategories)
        {
            foreach (var category in categories)
            {
                AddCategoryRow(category);
            }
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow - categories.Count)}:{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow - 1)})"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            _googleSheetService.AddRow(cells);
            _googleSheetService.AddEmptyRow();
            _googleSheetService.AddEmptyRow();

        }

        public Sheet GetSheet()
        {
            AddChartsHeader();
            AddCategoriesTable(_budget.Categories, _budget.Subcategories);
            return _googleSheetService.GetSheet();
        }
    }
}