using System;

namespace DTO.GoogleSpreadsheet
{
    public class DashboardSubcategoryRow
    {
        public Guid Id { get; private set; }
        public Guid CategoryId { get; private set; }
        public int RowIndex { get; private set; }

        public DashboardSubcategoryRow(Guid id, Guid categoryId, int rowIndex)
        {
            Id = id;
            CategoryId = categoryId;
            RowIndex = rowIndex;
        }
    }
}