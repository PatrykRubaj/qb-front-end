import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category } from "../state";
import { v4 as uuidv4 } from "uuid";

interface Props {
  categories: Array<Category>;
  addCategory: Function;
  editCategory: Function;
  deleteCategory: Function;
}

const CategoryComponent: React.FC<Props> = ({
  categories,
  addCategory,
  editCategory,
  deleteCategory
}: Props) => {
  const [newCategory, setNewCategory] = useState({
    id: uuidv4(),
    name: ""
  });
  const [editMode, setEditMode] = useState(false);

  const categoryInput = React.createRef<HTMLInputElement>();

  const onNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    setNewCategory({
      ...newCategory,
      [name]: value
    });
  };

  const onEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    deleteCategory(category);

    setNewCategory(category);
    setEditMode(true);

    categoryInput.current?.focus();
  };

  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    deleteCategory(category);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    editMode ? editCategory(newCategory) : addCategory(newCategory);
    setNewCategory({
      id: uuidv4(),
      name: ""
    });

    categoryInput.current?.focus();
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Categories</h2>
        <form onSubmit={onFormSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                name="name"
                value={newCategory.name}
                onChange={onNameChange}
                ref={categoryInput}
                type="text"
                className="form-control"
                placeholder="Category"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                {editMode ? "Save" : "+ Add"}
              </button>
            </div>
          </div>
        </form>

        <table className="table table-borderless table-sm mt-2 table-striped">
          <thead className="thead-light">
            <tr>
              <th>Category</th>
              <th className="text-center" style={{ width: "10%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="align-middle">{category.name}</td>
                <td className="align-middle text-center">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e): void => onEditClick(e, category)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e): void => onDeleteClick(e, category)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryComponent;
