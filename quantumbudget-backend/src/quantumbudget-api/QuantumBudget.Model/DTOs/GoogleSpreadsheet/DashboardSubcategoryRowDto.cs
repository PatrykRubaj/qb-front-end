using System;

namespace QuantumBudget.Model.DTOs.GoogleSpreadsheet
{
    public class DashboardSubcategoryRowDto
    {
        public Guid Id { get; private set; }
        public Guid CategoryId { get; private set; }
        public int RowIndex { get; private set; }

        public DashboardSubcategoryRowDto(Guid id, Guid categoryId, int rowIndex)
        {
            Id = id;
            CategoryId = categoryId;
            RowIndex = rowIndex;
        }
    }
}