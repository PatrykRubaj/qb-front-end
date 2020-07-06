using System;
using System.Collections.Generic;
using System.Linq;
using DTO.BudgetData;
using Google.Apis.Sheets.v4.Data;

namespace Services
{
    public class GoogleSheetService
    {
        private int _currentRowIndex;
        private readonly Sheet _sheet;
        private readonly GridData _gridData;
        private readonly int _rowsNumber;
        private readonly int _colsNumber;
        private readonly string _sheetName;
        private readonly bool _hideGridLines;
        private readonly int _sheetId;
        private readonly int _frozenColumnCount;
        private readonly int _fronzenRowCount;
        private readonly Color _tabColor;


        public GoogleSheetService(string sheetName, int sheetId, int rowsNumber, int colsNumber, int frozenColumnCount, int fronzenRowCount, bool hideGridLines, Color tabColor)
        {
            _sheet = new Sheet()
            {
                Data = new List<GridData>(),
                ProtectedRanges = new List<ProtectedRange>(),
                Charts = new List<EmbeddedChart>(),
            };
            _sheetName = sheetName;
            _sheetId = sheetId;
            _rowsNumber = rowsNumber;
            _colsNumber = colsNumber;
            _frozenColumnCount = frozenColumnCount;
            _fronzenRowCount = fronzenRowCount;
            _hideGridLines = hideGridLines;
            _tabColor = tabColor;
            _currentRowIndex = 0;

            _gridData = new GridData()
            {
                RowData = new List<RowData>(),
                RowMetadata = new List<DimensionProperties>(),
                ColumnMetadata = new List<DimensionProperties>()
            };
            _sheet.Data.Add(_gridData);

            SetDefaults();
        }

        private void SetDefaults()
        {
            var sheetProperties = new SheetProperties();
            sheetProperties.Title = _sheetName;
            sheetProperties.SheetId = _sheetId;
            sheetProperties.SheetType = "GRID";
            sheetProperties.TabColor = _tabColor;

            var gridProperties = new GridProperties();
            gridProperties.ColumnCount = _colsNumber;
            gridProperties.RowCount = _rowsNumber;
            gridProperties.HideGridlines = _hideGridLines;
            gridProperties.FrozenColumnCount = _frozenColumnCount;
            gridProperties.FrozenRowCount = _fronzenRowCount;


            sheetProperties.GridProperties = gridProperties;
            _sheet.Properties = sheetProperties;
        }

        public void AddRow(IList<CellData> cellData)
        {
            var rowData = new RowData()
            {
                Values = cellData
            };

            _gridData.RowData.Add(rowData);
            _currentRowIndex++;
        }

        public void AddEmptyRow()
        {
            IList<CellData> cellData = new List<CellData>();
            cellData.Add(new CellData());
            var rowData = new RowData()
            {
                Values = cellData
            };

            _gridData.RowData.Add(rowData);
            _currentRowIndex++;
        }

        public void SetRowHeight(int row, int height)
        {
            for (int i = 0; i < row; i++)
            {
                var rowMetadata = _gridData.RowMetadata.ElementAtOrDefault(i);

                if (rowMetadata == null)
                {
                    _gridData.RowMetadata.Add(new DimensionProperties());
                }
            }

            var modifiedRow = _gridData.RowMetadata.ElementAtOrDefault(row);
            if (modifiedRow == null)
            {
                var dimensionProperties = new DimensionProperties()
                {
                    PixelSize = height
                };
                _gridData.RowMetadata.Add(dimensionProperties);
            }
            else
            {
                modifiedRow.PixelSize = height;
            }
        }

        public void SetColumnWidth(int column, int width)
        {
            for (int i = 0; i < column; i++)
            {
                var columnMetadata = _gridData.ColumnMetadata.ElementAtOrDefault(i);

                if (columnMetadata == null)
                {
                    _gridData.ColumnMetadata.Add(new DimensionProperties());
                }
            }

            var modifiedColumn = _gridData.ColumnMetadata.ElementAtOrDefault(column);
            if (modifiedColumn == null)
            {
                var dimensionProperties = new DimensionProperties()
                {
                    PixelSize = width
                };
                _gridData.ColumnMetadata.Add(dimensionProperties);
            }
            else
            {
                modifiedColumn.PixelSize = width;
            }
        }

        public void MergeRange(GridRange range)
        {
            if (_sheet.Merges == null)
            {
                _sheet.Merges = new List<GridRange>();
            }
            range.SheetId = _sheet.Properties.SheetId;
            _sheet.Merges.Add(range);
        }

        public Sheet GetSheet() => _sheet;

        public static string GetColumnLetterFromNumber(int colNumber)
        {
            int reminder;
            int division = Math.DivRem(colNumber, 26, out reminder);
            string columnName = "";

            if (division == 0)
            {
                var letter = (char)(reminder + 'A');
                columnName += letter.ToString();
            }
            else
            {
                var firstLetter = (char)(division - 1 + 'A');
                columnName += firstLetter.ToString();
                var secondLetter = (char)(reminder + 'A');
                columnName += secondLetter.ToString();
            }

            return columnName;
        }

        public static int GetSheetRow(int zeroBasedRow) => zeroBasedRow + 1;
        public static string GetCellAddress(int zeroBaserColumn, int zeroBasedRow)
        {
            string columnLetter = GetColumnLetterFromNumber(zeroBaserColumn);
            int sheetRow = GetSheetRow(zeroBasedRow);

            return $"{columnLetter}{sheetRow}";
        }

        public static Borders GetTopBorder()
        {
            var borders = new Borders()
            {
                Top = new Border()
                {
                    Style = "SOLID"
                }
            };

            return borders;
        }
        public static Borders GetBottomBorder()
        {
            var borders = new Borders()
            {
                Bottom = new Border()
                {
                    Style = "SOLID"
                }
            };

            return borders;
        }

        public static Borders GetAllBorders()
        {
            var border = new Border()
            {
                Style = "SOLID"
            };

            var borders = new Borders()
            {
                Bottom = border,
                Top = border,
                Left = border,
                Right = border,
            };

            return borders;
        }

        public static Borders GetBottomMediumBorder()
        {
            var borders = new Borders()
            {
                Bottom = new Border()
                {
                    Style = "SOLID_MEDIUM"
                }
            };

            return borders;
        }
        public static Borders GetTopMediumBorder()
        {
            var borders = new Borders()
            {
                Top = new Border()
                {
                    Style = "SOLID_MEDIUM"
                }
            };

            return borders;
        }

        public static Borders GeTopAndBottomMediumBorder()
        {
            var borders = new Borders()
            {
                Top = new Border()
                {
                    Style = "SOLID_MEDIUM"
                },
                Bottom = new Border()
                {
                    Style = "SOLID_MEDIUM"
                }
            };

            return borders;
        }

        public static TextFormat GetDefaultCellFormatting()
        {
            var textFormat = new TextFormat()
            {
                FontFamily = "Verdana",
                FontSize = 10
            };

            return textFormat;
        }

        public static TextFormat GetDefaultTableHeaderFormatting()
        {
            var textFormat = new TextFormat()
            {
                FontFamily = "Verdana",
                FontSize = 10,
                Bold = true
            };

            return textFormat;
        }

        public void AddProtectedRanges(int startColumn, int endColumn, int startRow, int endRow)
        {
            var protectedRange = new ProtectedRange();
            protectedRange.WarningOnly = true;
            protectedRange.Range = new GridRange()
            {
                StartColumnIndex = startColumn,
                EndColumnIndex = endColumn,
                StartRowIndex = startRow,
                EndRowIndex = endRow,
                SheetId = _sheet.Properties.SheetId,
            };
            _sheet.ProtectedRanges.Add(protectedRange);
        }

        public void AddChart(int anchorCol, int anchorRow, ChartSpec chartSpec)
        {
            var embededChart = new EmbeddedChart();
            embededChart.Position = new EmbeddedObjectPosition()
            {
                OverlayPosition = new OverlayPosition()
                {
                    AnchorCell = new GridCoordinate()
                    {
                        SheetId = _sheet.Properties.SheetId,
                        ColumnIndex = anchorCol,
                        RowIndex = anchorRow,
                    }
                }
            };
            embededChart.Spec = chartSpec;
            _sheet.Charts.Add(embededChart);
        }

        public int CurrentRow => _currentRowIndex;
    }
}