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
            _googleSheetService = new GoogleSheetService(budget.Incomes.Count, budget.Categories.Count, budget.Subcategories.Count);
            _budget = budget;
        }

        private void AddSpendingHeader()
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
                    NumberValue = Convert.ToDouble(_budget.Incomes.Sum(x => x.Amount))
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
                    NumberValue = Convert.ToDouble(_budget.Subcategories.Sum(x => x.Amount))
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
                    NumberValue = Convert.ToDouble(_budget.Incomes.Sum(x => x.Amount) - _budget.Subcategories.Sum(x => x.Amount))
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
            _googleSheetService.AddRow(cells);
            _googleSheetService.AddEmptyRow();
        }

        private void AddIncomeHeader()
        {
            var cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Income"
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Name"
                }
            });
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
                    StringValue = "Actual income"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Difference"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Realisation"
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Sum:"
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
                        Type = "PERCENT"
                    }
                }
            });
            _googleSheetService.AddRow(cells);
        }

        private void AddCategoryHeader(string categoryName)
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
                }
            });
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
                    StringValue = "Actual spending"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Difference"
                }
            });
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Realisation"
                }
            });
            _googleSheetService.AddRow(cells);

            cells = new List<CellData>();
            cells.Add(new CellData()
            {
                UserEnteredValue = new ExtendedValue()
                {
                    StringValue = "Sum:"
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
                        Type = "PERCENT"
                    }
                }
            });
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
                        NumberValue = 0
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "PERCENT"
                        }
                    }
                });
                _googleSheetService.AddRow(cells);
            }
            _googleSheetService.AddEmptyRow();
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
            AddCategoryHeader(categoryName);

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
                subCells.Add(new CellData()
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
                subCells.Add(new CellData()
                {
                    UserEnteredValue = new ExtendedValue()
                    {
                        NumberValue = 0
                    },
                    UserEnteredFormat = new CellFormat()
                    {
                        NumberFormat = new NumberFormat()
                        {
                            Type = "PERCENT"
                        }
                    }
                });
                _googleSheetService.AddRow(subCells);
            }

            _googleSheetService.AddEmptyRow();
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