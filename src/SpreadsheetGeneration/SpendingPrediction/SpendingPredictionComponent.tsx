import React from "react";

const SpendingPredictionComponent: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <h2>Spending plan</h2>
        <form>
          {["Food", "Rent", "Entertainment"].map(categoryId => (
            <>
              <h2>{`${categoryId}`}</h2>
              {[0, 1, 2].map(subcategoryId => (
                <div className="form-group" key={`group-${subcategoryId}`}>
                  <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategoryId}`}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder={`Subcategory ${subcategoryId}`}
                  />
                </div>
              ))}
            </>
          ))}
        </form>
      </div>
    </div>
  );
};

export default SpendingPredictionComponent;
