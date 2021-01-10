using System;
using System.Collections.Generic;
using System.Linq;
using Functions.Model.DTOs.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class SpendingSheetService
    {
        private readonly Budget _budget;
        private readonly GoogleSheetService _googleSheetService;
        private readonly IList<int> _subcategoriesRowsIndexes;
        private readonly List<CellData> _subcategoriesRows;

        public SpendingSheetService(Budget budget)
        {
            _budget = budget;
            int rowsNumber = 16 + (_budget.Incomes.Count + 4) + (_budget.Categories.Count * 4) + _budget.Subcategories.Count;
            int colsNumber = 6 + DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month);
            _googleSheetService = new GoogleSheetService("Spending", 1, rowsNumber, colsNumber, 5, 0, false, GetSheetsColor());
            _subcategoriesRowsIndexes = new List<int>();
            _subcategoriesRows = new List<CellData>();
            _googleSheetService.SetRowHeight(0, 50);
            _googleSheetService.SetColumnWidth(0, 180);
            _googleSheetService.SetColumnWidth(1, 110);
            _googleSheetService.SetColumnWidth(2, 110);
            _googleSheetService.SetColumnWidth(3, 110);
            _googleSheetService.SetColumnWidth(4, 100);
        }

        private Color GetSheetsColor() => new Color()
        {
            Alpha = 1,
            Red = (float)207 / 256,
            Green = (float)224 / 256,
            Blue = (float)227 / 256
        };

        private void AddSpendingHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Spending"
                },
                UserEnteredFormat = new CellFormat()
                {
                    BackgroundColor = GetSheetsColor(),
                    TextFormat = new TextFormat()
                    {
                        FontSize = 18,
                        Bold = true,
                        FontFamily = "Verdana",
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
                    StringValue = "Budget Plan"
                },
                UserEnteredFormat = SubHeaderFormat(),
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned income"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=B13"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    TextFormat = GoogleSheetService.GetDefaultCellFormatting()
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned spending"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=B14"
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

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "To allocate"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=B3-B4"
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

            //Budget Realisation
            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Budget Realization"
                },
                UserEnteredFormat = SubHeaderFormat(),
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual income"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=C13"
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

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual spending"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=C14"
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

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Still available"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=B8-B9"
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

            //Header table
            cells = new List<CellData>();
            cells.Add(new CellData());
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "RIGHT",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "RIGHT",
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
                    HorizontalAlignment = "RIGHT",
                }
            });
            _googleSheetService.AddRow(cells);

            //Income sum:
            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Income sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "RIGHT"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"={GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow + 5)}"
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
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"={GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow + 5)}"
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
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"={GoogleSheetService.GetCellAddress(3, _googleSheetService.CurrentRow + 5)}"
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

            //Spending sum:
            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Spending sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "RIGHT"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    NumberValue = 0
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
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    NumberValue = 0
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
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=C14-B14"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    }
                }
            });
            cells.ForEach(x => _subcategoriesRows.Add(x));
            _googleSheetService.AddRow(cells);
            _googleSheetService.AddEmptyRow();
            _googleSheetService.MergeRange(new GridRange()
            {
                StartRowIndex = 0,
                EndRowIndex = 1,
                StartColumnIndex = 0,
                EndColumnIndex = 5
            });
        }

        private void AddIncomeHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Income"
                },
                UserEnteredFormat = SubHeaderFormat(),
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Name"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Planned income"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual income"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
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
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Realization"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "CENTER",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData());

            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(6 + i, _googleSheetService.CurrentRow + 2)}:{GoogleSheetService.GetCellAddress(6 + i, _googleSheetService.CurrentRow + 2 + _budget.Incomes.Count - 1)})"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        },
                        Borders = GoogleSheetService.GetTopBorder(),
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        VerticalAlignment = "MIDDLE",
                    }
                });
            }
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow + 1)}:{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow + _budget.Incomes.Count)})"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow + 1)}:{GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow + _budget.Incomes.Count)})"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"={GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}-{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=IFERROR({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}/{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}; \"-\")"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "PERCENT",
                        Pattern = "0.00%"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "CENTER",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData());
            DateTime columnDate = new DateTime(_budget.Month.Year, _budget.Month.Month, 1);
            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        StringValue = $"{columnDate.ToString("yyyy-MM-dd")}"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        Borders = GoogleSheetService.GetBottomBorder(),
                        TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                        HorizontalAlignment = "CENTER",
                        VerticalAlignment = "MIDDLE",
                    }
                });
                columnDate = columnDate.AddDays(1);
            }

            _googleSheetService.AddRow(cells);
        }

        private void AddCategoryHeader(string categoryName, int subcategoriesCount)
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = categoryName
                },
                UserEnteredFormat = SubHeaderFormat(),
            });
            _budget.Categories.FirstOrDefault(x => x.Name.ToLower() == categoryName.ToLower()).RowIndex = _googleSheetService.CurrentRow;
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Name"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    VerticalAlignment = "MIDDLE",
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
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
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
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
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
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "RIGHT",
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Realization"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    WrapStrategy = "WRAP",
                    HorizontalAlignment = "CENTER",
                    VerticalAlignment = "MIDDLE",
                }
            });

            cells.Add(new CellData());
            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(6 + i, _googleSheetService.CurrentRow + 2)}:{GoogleSheetService.GetCellAddress(6 + i, _googleSheetService.CurrentRow + 2 + subcategoriesCount - 1)})"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        },
                        Borders = GoogleSheetService.GetTopBorder(),
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        VerticalAlignment = "MIDDLE",
                    }
                });
            }
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Sum:"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow + 1)}:{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow + subcategoriesCount)})"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow + 1)}:{GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow + subcategoriesCount)})"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"={GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}-{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "CURRENCY"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    VerticalAlignment = "MIDDLE",
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = $"=IFERROR({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}/{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}; \"-\")"
                },
                UserEnteredFormat = new CellFormat()
                {
                    NumberFormat = new NumberFormat()
                    {
                        Type = "PERCENT",
                        Pattern = "0.00%"
                    },
                    Borders = GoogleSheetService.GetBottomBorder(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "CENTER",
                    VerticalAlignment = "MIDDLE",
                }
            });

            cells.Add(new CellData());
            DateTime columnDate = new DateTime(_budget.Month.Year, _budget.Month.Month, 1);
            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        StringValue = $"{columnDate.ToString("yyyy-MM-dd")}"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        Borders = GoogleSheetService.GetBottomBorder(),
                        TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                        HorizontalAlignment = "CENTER",
                        VerticalAlignment = "MIDDLE",
                    }
                });
                columnDate = columnDate.AddDays(1);
            }
            _googleSheetService.AddRow(cells);
        }

        private void AddIncomesSection(IList<Income> incomes)
        {
            AddIncomeHeader();
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
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(6, _googleSheetService.CurrentRow)}:{GoogleSheetService.GetCellAddress(6 + DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month) - 1, _googleSheetService.CurrentRow)})"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        }
                    }
                });
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"={GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}-{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        }
                    }
                });
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = $"=IFERROR({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}/{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}; \"-\")"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "PERCENT",
                            Pattern = "0.00%"
                        },
                        HorizontalAlignment = "CENTER",
                    }
                });
                cells.Add(new CellData());
                for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
                {
                    cells.Add(new CellData()
                    {
                        UserEnteredFormat = new CellFormat()
                        {
                            NumberFormat = new NumberFormat()
                            {
                                Type = "CURRENCY"
                            }
                        }
                    });
                }
                _googleSheetService.AddRow(cells);
            }
            _googleSheetService.AddEmptyRow();
        }

        private void AddCategoriesSections(IList<Category> categories, IList<Subcategory> subcategories)
        {
            foreach (var category in categories)
            {
                if (!categories.Last().Equals(category))
                {
                    AddCategorySection(category.Name, subcategories.Where(x => x.CategoryId == category.Id));
                }
                else
                {
                    AddCategorySection(category.Name, subcategories.Where(x => x.CategoryId == category.Id), true);
                }
            }

            AddTotalSumRow();
            AddCumulativeSumRow();
        }

        private void AddTotalSumRow()
        {
            var emptyCellWithTopBorder = new CellData()
            {
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder(),
                }
            };

            //Add Total sum row
            var cells = new List<CellData>();
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Total sum:",
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = new TextFormat()
                    {
                        FontFamily = "Verdana",
                        Bold = true,
                    },
                    HorizontalAlignment = "RIGHT",
                    Borders = GoogleSheetService.GetTopBorder(),
                }
            });
            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                int COLUMN_SHIFT = 6;
                string formula = "=SUM(";
                foreach (var subcategoryIndex in _subcategoriesRowsIndexes)
                {
                    string address = GoogleSheetService.GetCellAddress(i + COLUMN_SHIFT, subcategoryIndex);
                    if (!_subcategoriesRowsIndexes.Last().Equals(subcategoryIndex))
                    {
                        formula += $"{address}+";
                    }
                    else
                    {
                        formula += $"{address})";
                    }
                }
                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = formula
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY"
                        },
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        Borders = GoogleSheetService.GetTopBorder(),
                    }
                });
            }
            _googleSheetService.AddRow(cells);
        }
        private void AddCumulativeSumRow()
        {
            var emptyCellWithTopBorder = new CellData()
            {
                UserEnteredFormat = new CellFormat()
                {
                }
            };

            //Add Cumulative sum row
            var cells = new List<CellData>();
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(emptyCellWithTopBorder);
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Cumulative sum:",
                },
                UserEnteredFormat = new CellFormat()
                {
                    TextFormat = new TextFormat()
                    {
                        FontFamily = "Verdana",
                        Bold = true,
                    },
                    HorizontalAlignment = "RIGHT",
                    WrapStrategy = "WRAP",
                }
            });
            for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
            {
                int COLUMN_SHIFT = 6;
                string formula = "";

                if (i == 0)
                {
                    formula = $"={GoogleSheetService.GetCellAddress(i + COLUMN_SHIFT, _googleSheetService.CurrentRow - 1)}";
                }
                else
                {
                    formula = $"={GoogleSheetService.GetCellAddress(i + COLUMN_SHIFT - 1, _googleSheetService.CurrentRow)}+{GoogleSheetService.GetCellAddress(i + COLUMN_SHIFT, _googleSheetService.CurrentRow - 1)}";
                }

                cells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        FormulaValue = formula,
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "CURRENCY",
                        },
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        VerticalAlignment = "MIDDLE",
                    }
                });
            }
            _googleSheetService.AddRow(cells);
        }

        private void AddCategorySection(string categoryName, IEnumerable<Subcategory> subcategories, bool isLast = false)
        {
            AddCategoryHeader(categoryName, subcategories.Count());

            foreach (var sub in subcategories)
            {
                var subCells = new List<CellData>();
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        StringValue = sub.Name
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
                        NumberValue = Convert.ToDouble(sub.Amount)
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
                        FormulaValue = $"=SUM({GoogleSheetService.GetCellAddress(6, _googleSheetService.CurrentRow)}:{GoogleSheetService.GetCellAddress(6 + DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month) - 1, _googleSheetService.CurrentRow)})"
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
                        FormulaValue = $"={GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}-{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}"
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
                        FormulaValue = $"=IFERROR({GoogleSheetService.GetCellAddress(2, _googleSheetService.CurrentRow)}/{GoogleSheetService.GetCellAddress(1, _googleSheetService.CurrentRow)}; \"-\")"
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "PERCENT",
                            Pattern = "0.00%"
                        },
                        TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        HorizontalAlignment = "CENTER",
                    }
                });
                subCells.Add(new CellData());
                for (int i = 0; i < DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month); i++)
                {
                    subCells.Add(new CellData()
                    {
                        UserEnteredFormat = new CellFormat()
                        {
                            NumberFormat = new NumberFormat()
                            {
                                Type = "CURRENCY"
                            },
                            TextFormat = GoogleSheetService.GetDefaultCellFormatting(),
                        }
                    });
                }
                sub.RowIndex = _googleSheetService.CurrentRow;
                _subcategoriesRowsIndexes.Add(_googleSheetService.CurrentRow);

                _googleSheetService.AddRow(subCells);

            }

            List<string> listOfPlannedAddresses = new List<string>();
            List<string> listOfActualAddresses = new List<string>();
            foreach (var index in _subcategoriesRowsIndexes)
            {
                listOfPlannedAddresses.Add(GoogleSheetService.GetCellAddress(1, index));
                listOfActualAddresses.Add(GoogleSheetService.GetCellAddress(2, index));
            }
            _subcategoriesRows.ElementAt(1).UserEnteredValue = new ExtendedValue()
            {
                FormulaValue = $"={string.Join('+', listOfPlannedAddresses)}"
            };
            _subcategoriesRows.ElementAt(2).UserEnteredValue = new ExtendedValue()
            {
                FormulaValue = $"={string.Join('+', listOfActualAddresses)}"
            };

            if (isLast == false)
            {
                _googleSheetService.AddEmptyRow();
            }
        }

        private CellFormat SubHeaderFormat()
        {
            return new CellFormat()
            {
                TextFormat = new TextFormat()
                {
                    FontSize = 14,
                    Bold = true,
                    FontFamily = "Verdana",
                },
                VerticalAlignment = "MIDDLE",
                HorizontalAlignment = "LEFT"
            };
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