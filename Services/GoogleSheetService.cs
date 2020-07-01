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

        public GoogleSheetService(int incomesCount, int categoriesCount, int subcategoriesCount, int daysInMonth)
        {
            _sheet = new Sheet();
            _currentRowIndex = 0;

            if (_sheet.Data == null)
            {
                _sheet.Data = new List<GridData>();
            }
            _gridData = new GridData()
            {
                RowData = new List<RowData>()
            };
            _sheet.Data.Add(_gridData);
            SetDefaults(incomesCount, categoriesCount, subcategoriesCount, daysInMonth);
        }

        private void SetDefaults(int incomesCount = 1, int categoriesCount = 2, int subcategoriesCount = 3, int daysInMonth = 31)
        {
            var sheetProperties = new SheetProperties();
            sheetProperties.Title = "Spending";
            sheetProperties.SheetType = "GRID";
            sheetProperties.TabColor = new Color()
            {
                Alpha = 1,
                Red = 0xd0,
                Green = 0xe0,
                Blue = 0xe3
            };

            var gridProperties = new GridProperties();
            gridProperties.ColumnCount = 6 + daysInMonth;
            gridProperties.RowCount = 15 + (incomesCount + 4) + (categoriesCount * 4) + subcategoriesCount;
            gridProperties.HideGridlines = false;
            gridProperties.FrozenColumnCount = 5;


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

        public int CurrentRow => _currentRowIndex;
    }
}