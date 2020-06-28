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

        public GoogleSheetService()
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
            SetDefaults();
        }

        private void SetDefaults(int incomesCount = 1, int categoriesCount = 2, int subcategoriesCount = 3)
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
            gridProperties.ColumnCount = 6 + DateTime.DaysInMonth(2020, 6);
            gridProperties.RowCount = 15 + (incomesCount + 4) + (categoriesCount * 4) + subcategoriesCount;
            gridProperties.HideGridlines = true;
            gridProperties.FrozenColumnCount = 5;


            sheetProperties.GridProperties = gridProperties;
            _sheet.Properties = sheetProperties;
        }

        public void AddGridData(GridData gridData)
        {

            // _sheet.Data.Add(gridData);
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

        public Sheet GetSheet() => _sheet;
    }
}