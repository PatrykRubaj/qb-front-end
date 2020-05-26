import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, EntityStatus } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarngingDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import CategoryForm from "./CategoryForm";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import categoryActions from "../../redux/actions/categoryActions";
import * as categoryTypes from "../../redux/types/categoryTypes";

interface StateProps {
  categories: Array<Category>;
  formValues: Category;
  onlyOneEditAllowedPrompt: boolean;
}

interface DispatchProps {
  addCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (category: Category) => void;
  setCategoryFormValues: (category: Category) => void;
  setCategoryPromptVisibility: (isVisible: boolean) => void;
}

type Props = StateProps & DispatchProps;

const CategoryComponent: React.FC<Props> = ({
  categories,
  formValues,
  setCategoryFormValues,
  addCategory,
  editCategory,
  deleteCategory,
  onlyOneEditAllowedPrompt,
  setCategoryPromptVisibility,
}: Props) => {
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
      setCategoryFormValues(category);

      categoryInput.current?.focus();
    } else {
      setCategoryPromptVisibility(true);
    }
  };

  const onDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    deleteCategory(category);
  };

  const onFormSubmit = (category: Category): void => {
    const categoryToSave = { ...category, status: EntityStatus.Saved };
    category.status === EntityStatus.Editing
      ? editCategory(categoryToSave)
      : addCategory(categoryToSave);
    setCategoryFormValues({
      id: uuidv4(),
      name: "",
      status: EntityStatus.New,
    });

    categoryInput.current?.focus();
  };

  return (
    <div className="row">
      <WarngingDialog
        show={onlyOneEditAllowedPrompt}
        onExit={(): void => setCategoryPromptVisibility(false)}
        title="Edit already in progress"
        description="Save entry before editing a new one"
      />
      <div className="col">
        <h2>Categories</h2>
        <CategoryForm
          newCategory={formValues}
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    categories: state.categoriesSection.categories,
    formValues: state.categoriesSection.formValues,
    onlyOneEditAllowedPrompt: state.categoriesSection.onlyOneEditAllowedPrompt,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteCategory: (category: Category): categoryTypes.CategoryActionTypes =>
      dispatch(categoryActions.deleteCategory(category)),
    addCategory: (category: Category): categoryTypes.CategoryActionTypes =>
      dispatch(categoryActions.addCategory(category)),
    editCategory: (category: Category): categoryTypes.CategoryActionTypes =>
      dispatch(categoryActions.editCategory(category)),
    setCategoryFormValues: (
      category: Category
    ): categoryTypes.CategoryActionTypes =>
      dispatch(categoryActions.setCategoryFormValues(category)),
    setCategoryPromptVisibility: (
      isVisible: boolean
    ): categoryTypes.CategoryActionTypes =>
      dispatch(categoryActions.setCategoryPromptVisibility(isVisible)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
