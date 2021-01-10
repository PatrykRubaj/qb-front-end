using System;
using System.Collections.Generic;
using System.Linq;
using Functions.Model.DTOs.BudgetData;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Logging;

namespace Services
{
    public class ChartsSheetService
    {
        private readonly Budget _budget;
        private readonly GoogleSheetService _googleSheetService;
        private readonly ILogger _log;

        public ChartsSheetService(Budget budget, ILogger log)
        {
            _budget = budget ?? throw new ArgumentNullException(nameof(budget));
            _log = log;

            int rowsNumber = 5 + _budget.Categories.Count + 54;
            int colsNumber = 7;

            _googleSheetService = new GoogleSheetService("Charts", 2, rowsNumber, colsNumber, 0, 0, true, GetSheetsColor());
            _googleSheetService.SetRowHeight(0, 50);
            _googleSheetService.AddProtectedRanges(0, 2, 1, 3 + _budget.Categories.Count);
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
                    Borders = GoogleSheetService.GetAllBorders(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
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
                    Borders = GoogleSheetService.GetAllBorders(),
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    HorizontalAlignment = "RIGHT",
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
                    Borders = GoogleSheetService.GetAllBorders(),
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
                    Borders = GoogleSheetService.GetAllBorders(),
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
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                    HorizontalAlignment = "RIGHT",
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
                    TextFormat = GoogleSheetService.GetDefaultTableHeaderFormatting(),
                    Borders = GoogleSheetService.GetTopMediumBorder(),
                }
            });
            _googleSheetService.AddRow(cells);
            _googleSheetService.AddEmptyRow();
            _googleSheetService.AddEmptyRow();

        }

        private void AddCharts()
        {
            AddPieChart();
            SmootheLineChart();
            AddBarChart();
        }

        private void AddPieChart()
        {
            var anchorRow = 5 + _budget.Categories.Count;
            var chartSpec = new ChartSpec()
            {
                Title = "Categories share",
                PieChart = new PieChartSpec()
                {
                    LegendPosition = "LABELED_LEGEND",
                    PieHole = 0.65,
                    Series = new ChartData()
                    {
                        SourceRange = new ChartSourceRange()
                        {
                            Sources = new List<GridRange>() {
                                new GridRange() {
                                    StartColumnIndex = 1,
                                    EndColumnIndex = 2,
                                    StartRowIndex = 1,
                                    EndRowIndex = 2 + _budget.Categories.Count,
                                    SheetId = 2,
                                }
                            }
                        }
                    },
                    Domain = new ChartData()
                    {
                        SourceRange = new ChartSourceRange()
                        {
                            Sources = new List<GridRange>() {
                                new GridRange() {
                                    StartColumnIndex = 0,
                                    EndColumnIndex = 1,
                                    StartRowIndex = 1,
                                    EndRowIndex = 2 + _budget.Categories.Count,
                                    SheetId = 2,
                                }
                            }
                        }
                    }
                }
            };

            _googleSheetService.AddChart(0, anchorRow, chartSpec);
        }

        private void SmootheLineChart()
        {
            var anchorRow = 5 + _budget.Categories.Count + 18;
            int lastCategoryRowIndex = _budget.Categories.Last().RowIndex;
            _log.LogInformation($"Last Category index: {lastCategoryRowIndex}");
            var chartSpec = new ChartSpec()
            {
                Title = "Cumulative spending",
                BasicChart = new BasicChartSpec()
                {
                    ChartType = "LINE",
                    LegendPosition = "NO_LEGEND",
                    LineSmoothing = true,
                    Axis = new List<BasicChartAxis>()
                    {
                        new BasicChartAxis()
                        {
                            Position = "BOTTOM_AXIS",
                            Title = "Day",
                            TitleTextPosition = new TextPosition()
                            {
                                HorizontalAlignment = "CENTER"
                            }
                        },
                        new BasicChartAxis()
                        {
                            Position = "LEFT_AXIS",
                            Title = "Total spent",
                            TitleTextPosition = new TextPosition()
                            {
                                HorizontalAlignment = "CENTER"
                            },
                        },
                    },
                    Series = new List<BasicChartSeries>()
                    {
                        new BasicChartSeries()
                        {
                            Series = new ChartData()
                            {
                                SourceRange = new ChartSourceRange()
                                {
                                    Sources = new List<GridRange>()
                                    {
                                        new GridRange()
                                        {
                                            StartColumnIndex = 6,
                                            EndColumnIndex = 6 + DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month),
                                            StartRowIndex = lastCategoryRowIndex + 2 + _budget.Subcategories.Where( x=> x.CategoryId == _budget.Categories.Last().Id).Count() + 2,
                                            EndRowIndex = lastCategoryRowIndex + 2 + _budget.Subcategories.Where( x=> x.CategoryId == _budget.Categories.Last().Id).Count() + 1 + 2,
                                            SheetId = 1,
                                        },
                                    }
                                },

                            },
                            Color = new Color()
                            {
                                Alpha = 1,
                                Red = (float)0x93 / 256,
                                Green = (float)0xc4 / 256,
                                Blue = (float)0x7d / 256,
                            },
                        },
                    },
                    Domains = new List<BasicChartDomain>()
                    {
                        new BasicChartDomain()
                        {
                            Domain = new ChartData()
                            {
                                SourceRange = new ChartSourceRange()
                                {
                                    Sources = new List<GridRange>()
                                    {
                                        new GridRange()
                                        {
                                            StartColumnIndex = 6,
                                            EndColumnIndex = 6 + DateTime.DaysInMonth(_budget.Month.Year, _budget.Month.Month),
                                            StartRowIndex = lastCategoryRowIndex + 2,
                                            EndRowIndex = lastCategoryRowIndex + 3,
                                            SheetId = 1,
                                        },
                                    }
                                },
                            },
                        }
                    }
                }
            };

            _log.LogInformation($"Line chart spec: {Newtonsoft.Json.JsonConvert.SerializeObject(chartSpec)}");

            _googleSheetService.AddChart(0, anchorRow, chartSpec);
        }

        private void AddBarChart()
        {
            var anchorRow = 5 + _budget.Categories.Count + 2 * 18;
            var chartSpec = new ChartSpec()
            {
                Title = "Spending in categories",
                BasicChart = new BasicChartSpec()
                {
                    ChartType = "COLUMN",
                    Series = new List<BasicChartSeries>()
                    {
                        new BasicChartSeries()
                        {
                            Series = new ChartData()
                            {
                                SourceRange = new ChartSourceRange()
                                {
                                    Sources = new List<GridRange>()
                                    {
                                        new GridRange() {
                                            StartColumnIndex = 1,
                                            EndColumnIndex = 2,
                                            StartRowIndex = 2,
                                            EndRowIndex = 2 + _budget.Categories.Count,
                                            SheetId = 2,
                                        }
                                    }
                                },
                            },
                            Color = new Color()
                            {
                                Alpha = 1,
                                Red = (float)0x8e / 256,
                                Green = (float)0x7c / 256,
                                Blue = (float)0xc3 / 256,
                            },
                        },
                    },
                    Domains = new List<BasicChartDomain>()
                    {
                        new BasicChartDomain()
                        {
                            Domain = new ChartData()
                            {
                                SourceRange = new ChartSourceRange()
                                {
                                    Sources = new List<GridRange>()
                                    {
                                        new GridRange()
                                        {
                                            StartColumnIndex = 0,
                                            EndColumnIndex = 1,
                                            StartRowIndex = 2,
                                            EndRowIndex = 2 + _budget.Categories.Count,
                                            SheetId = 2,
                                        }
                                    }
                                },
                            },
                        }
                    }
                }
            };

            _googleSheetService.AddChart(0, anchorRow, chartSpec);
        }

        public Sheet GetSheet()
        {
            AddChartsHeader();
            AddCategoriesTable(_budget.Categories, _budget.Subcategories);
            AddCharts();
            return _googleSheetService.GetSheet();
        }
    }
}