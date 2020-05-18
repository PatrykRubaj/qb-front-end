import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, EntityStatus } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarngingDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import CategoryForm from "./CategoryForm";
import { RootState } from "../../Redux/reducers";
import { connect } from "react-redux";

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
  const [newCategory, setNewCategory] = useState<Category>({
    id: uuidv4(),
    name: "",
    status: EntityStatus.New
  });
  const [showWarning, setShowWarning] = useState(false);

  const categoryInput = React.createRef<HTMLInputElement>();

  const onEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    if (
      categories.filter(x => x.status === EntityStatus.Editing).length === 0
    ) {
      category = { ...category, status: EntityStatus.Editing };
      setNewCategory(category);
      editCategory(category);

      categoryInput.current?.focus();
    } else {
      setShowWarning(true);
    }
  };

  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    // e.preventDefault();

    deleteCategory(category);
  };

  const onFormSubmit = (category: Category): void => {
    const categoryToSave = { ...category, status: EntityStatus.Saved };
    category.status === EntityStatus.Editing
      ? editCategory(categoryToSave)
      : addCategory(categoryToSave);
    setNewCategory({
      id: uuidv4(),
      name: "",
      status: EntityStatus.New
    });

    categoryInput.current?.focus();
  };

  return (
    <div className="row">
      <WarngingDialog
        show={showWarning}
        onExit={(): void => setShowWarning(false)}
        title="Edit already in progress"
        description="Save entry before editing a new one"
      />
      <div className="col">
        <h2>Categories</h2>
        <CategoryForm
          newCategory={newCategory}
          addSaveCategory={onFormSubmit}
          categoryNameInputRef={categoryInput}
          categories={categories}
        />
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
                      disabled={category.status === EntityStatus.Editing}
                    >
                      <EditIcon />
                    </button>
                    <ConfirmationDialog
                      title="Delete category?"
                      description="Do You want to delete category?"
                    >
                      {confirm => {
                        return (
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={confirm(onDeleteClick, category)}
                            disabled={category.status === EntityStatus.Editing}
                          >
                            <DeleteIcon />
                          </button>
                        );
                      }}
                    </ConfirmationDialog>
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

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(CategoryComponent);
