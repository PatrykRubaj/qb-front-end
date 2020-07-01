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
        private readonly IList<int> _subcategoriesRowsIndexes;
        private readonly List<CellData> _subcategoriesRows;

        public DashboardSheetService(Budget budget)
        {
            _budget = budget;
            _googleSheetService = new GoogleSheetService(_budget.Incomes.Count, _budget.Categories.Count, _budget.Subcategories.Count, DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month));
            _subcategoriesRowsIndexes = new List<int>();
            _subcategoriesRows = new List<CellData>();
        }

        private void AddDashboardHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Spending"
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
                    }
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
                    }
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
                    }
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
                    StringValue = "Budget Realisation"
                }
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
                    }
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
                    }
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
                    }
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
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Actual"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Difference"
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
                    }
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
                    }
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
                    }
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
                    }
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    FormulaValue = "=B14-C14"
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
        }

        private void AddCategoryHeader(string categoryName, int subcategoriesCount)
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

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Name"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder()
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
                    Borders = GoogleSheetService.GetTopBorder()
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
                    Borders = GoogleSheetService.GetTopBorder()
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
                    Borders = GoogleSheetService.GetTopBorder()
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Realisation"
                },
                UserEnteredFormat = new CellFormat()
                {
                    Borders = GoogleSheetService.GetTopBorder()
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
                        Borders = GoogleSheetService.GetTopBorder()
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
                    Borders = GoogleSheetService.GetBottomBorder()
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
                    Borders = GoogleSheetService.GetBottomBorder()
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
                    Borders = GoogleSheetService.GetBottomBorder()
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
                    Borders = GoogleSheetService.GetBottomBorder()
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
                    Borders = GoogleSheetService.GetBottomBorder()
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
                        Borders = GoogleSheetService.GetBottomBorder()
                    }
                });
                columnDate = columnDate.AddDays(1);
            }
            _googleSheetService.AddRow(cells);
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
            AddCategoryHeader(categoryName, subcategories.Count());

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
                        }
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
                        }
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
                        }
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
                            }
                        }
                    });
                }
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
            _googleSheetService.AddEmptyRow();
        }

        public Sheet GetSheet()
        {
            AddDashboardHeader();
            AddCategoriesSections(_budget.Categories, _budget.Subcategories);
            return _googleSheetService.GetSheet();
        }
    }
}