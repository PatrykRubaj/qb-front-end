import React from "react";
import { Category, Subcategory } from "../state";

interface Props {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
}

const SpendingPredictionComponent: React.FC<Props> = ({
  categories,
  subcategories
}: Props) => {
  return (
    <div className="row">
      <div className="col">
        <h2>Spending plan</h2>
        <form>
          {categories.map(category => (
            <React.Fragment key={category.id}>
              <h1>{category.name}</h1>
              {subcategories
                .filter(x => x.categoryId === category.id)
                .map(subcategory => (
                  <div className="form-group" key={`${subcategory.id}`}>
                    <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategory.name}`}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder={`Subcategory ${subcategory.name}`}
                    />
                  </div>
                ))}
            </React.Fragment>
          ))}
        </form>
      </div>
    </div>
  );
};

export default SpendingPredictionComponent;
