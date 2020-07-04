using System;
using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class DashboardSheetService
    {
        private readonly Budget _budget;
        private readonly GoogleSheetService _googleSheetService;
        private readonly List<CellData> _subcategoriesRows;

        public DashboardSheetService(Budget budget)
        {
            _budget = budget ?? throw new ArgumentNullException(nameof(budget));

            int rowsNumber = 3 + (_budget.Categories.Count * 2) + _budget.Subcategories.Count;
            int colsNumber = 4;

            _googleSheetService = new GoogleSheetService("Dashboard", 0, rowsNumber, colsNumber, 0, 2, true, GetSheetsColor());
            _subcategoriesRows = new List<CellData>();
            _googleSheetService.SetRowHeight(0, 50);
        }

        private Color GetSheetsColor() => new Color()
        {
            Alpha = 1,
            Red = (float)0xb4 / 256,
            Green = (float)0xa7 / 256,
            Blue = (float)0xd6 / 256
        };

        private void AddDashboardHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Dashboard"
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
                    StringValue = "Subcategory"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "BOTTOM",
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned spending"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "BOTTOM",
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual spending"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "BOTTOM",
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Difference"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "BOTTOM",
                    WrapStrategy = "WRAP",
                }
            });
            _googleSheetService.AddRow(cells);

            _googleSheetService.MergeRange(new GridRange()
            {
                StartRowIndex = 0,
                EndRowIndex = 1,
                StartColumnIndex = 0,
                EndColumnIndex = 4
            });
        }

        private void AddCategoryHeader(Category category)
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(0, category.RowIndex)}"
                },
                UserEnteredFormat = CategoryHeaderFormat()
            });
            _googleSheetService.SetRowHeight(_googleSheetService.CurrentRow, 30);
            _googleSheetService.MergeRange(new GridRange()
            {
                StartRowIndex = _googleSheetService.CurrentRow,
                EndRowIndex = _googleSheetService.CurrentRow + 1,
                StartColumnIndex = 0,
                EndColumnIndex = 4
            });
            _googleSheetService.AddRow(cells);
        }

        private CellFormat CategoryHeaderFormat()
        {
            return new CellFormat()
            {
                TextFormat = new TextFormat()
                {
                    FontSize = 12,
                    FontFamily = "Verdana",
                    Bold = true
                },
                Borders = GoogleSheetService.GeTopAndBottomMediumBorder(),
                VerticalAlignment = "MIDDLE",
                HorizontalAlignment = "CENTER"
            };
        }

        private void AddCategoriesSections(IList<Category> categories, IList<Subcategory> subcategories)
        {
            foreach (var category in categories)
            {
                AddCategorySection(category, subcategories.Where(x => x.CategoryId == category.Id));
                if (!category.Equals(categories.Last()))
                {
                    _googleSheetService.AddEmptyRow();
                }
            }
        }

        private void AddCategorySection(Category category, IEnumerable<Subcategory> subcategories)
        {
            AddCategoryHeader(category);

            foreach (var sub in subcategories)
            {
                var subCells = new List<CellData>();
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(0, sub.RowIndex)}"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                    }
                });
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(1, sub.RowIndex)}"
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
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(2, sub.RowIndex)}"
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
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(3, sub.RowIndex)}"
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

                _googleSheetService.AddRow(subCells);
            }
        }

        private void AddSummarySection()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Total sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(1, 13)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(2, 13)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=Spending!{GoogleSheetService.GetCellAddress(3, 13)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Subcategory"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "TOP",
                    Borders = GoogleSheetService.GetTopBorder(),
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned spending"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "TOP",
                    Borders = GoogleSheetService.GetTopBorder(),
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual spending"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "TOP",
                    Borders = GoogleSheetService.GetTopBorder(),
                    WrapStrategy = "WRAP",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Difference"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "TOP",
                    Borders = GoogleSheetService.GetTopBorder(),
                    WrapStrategy = "WRAP",
                }
            });
            _googleSheetService.AddRow(cells);
        }

        public Sheet GetSheet()
        {
            AddDashboardHeader();
            AddCategoriesSections(_budget.Categories, _budget.Subcategories);
            AddSummarySection();
            return _googleSheetService.GetSheet();
        }
    }
}