import React from "react";
import { Category, Subcategory } from "../state";

interface Props {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  enterSubcategoryAmount: Function;
}

const SpendingPredictionComponent: React.FC<Props> = ({
  categories,
  subcategories,
  enterSubcategoryAmount
}: Props) => {
  const onInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    subcategory: Subcategory
  ): void => {
    const target = e.currentTarget;
    const value = target.value;
    enterSubcategoryAmount(subcategory.id, +value);
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Spending plan</h2>
        <form>
          {categories.map(category => (
            <React.Fragment key={category.id}>
              <h3>{category.name}</h3>
              {subcategories
                .filter(x => x.categoryId === category.id)
                .map(subcategory => (
                  <div className="form-group" key={`${subcategory.id}`}>
                    <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategory.name}`}</label>
                    <input
                      name="amount"
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder={`Subcategory ${subcategory.name}`}
                      onChange={(e): void => onInputChange(e, subcategory)}
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
