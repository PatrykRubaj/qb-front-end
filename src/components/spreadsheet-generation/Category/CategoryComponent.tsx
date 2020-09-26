import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, EntityStatus } from "../../../redux/state";
import { v4 as uuidv4 } from "uuid";
import WarngingDialog from "../../common/WarningDialog";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import CategoryForm from "./CategoryForm";
import { RootState } from "../../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import categoryActions from "../../../redux/actions/categoryActions";
import * as categoryTypes from "../../../redux/types/categoryTypes";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

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
  moveElement: (startIndex: number, endIndex: number, id: string) => void;
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
  moveElement,
}: Props) => {
  const categoryInput = React.createRef<HTMLInputElement>();

  const onEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    if (
      categories.filter((x) => x.status === EntityStatus.Editing).length === 0
    ) {
      categoryInput.current?.focus();

      category = { ...category, status: EntityStatus.Editing };
      setCategoryFormValues(category);
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
    categoryInput.current?.focus();

    const categoryToSave = { ...category, status: EntityStatus.Saved };
    category.status === EntityStatus.Editing
      ? editCategory(categoryToSave)
      : addCategory(categoryToSave);
    setCategoryFormValues({
      id: uuidv4(),
      name: "",
      status: EntityStatus.New,
    });
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveElement(source.index, destination.index, draggableId);
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
              <th style={{ width: "90%" }}>Category</th>
              <th className="text-center" style={{ width: "10%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-categories">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map((category, index) => (
                    <Draggable
                      draggableId={category.id}
                      index={index}
                      key={category.id}
                    >
                      {(prov) => (
                        <tr
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          // eslint-disable-next-line @typescript-eslint/unbound-method
                          ref={prov.innerRef}
                        >
                          <td className="align-middle" style={{ width: "90%" }}>
                            {category.name}
                          </td>
                          <td
                            className="align-middle text-center"
                            style={{ width: "10%" }}
                          >
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={(e): void => onEditClick(e, category)}
                                disabled={
                                  category.status === EntityStatus.Editing
                                }
                              >
                                <EditIcon />
                              </button>
                              <ConfirmationDialog
                                title="Delete category?"
                                description="Do You want to delete category?"
                              >
                                {(confirm) => (
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={confirm(onDeleteClick, category)}
                                    disabled={
                                      category.status === EntityStatus.Editing
                                    }
                                  >
                                    <DeleteIcon />
                                  </button>
                                )}
                              </ConfirmationDialog>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
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
    moveElement: (startIndex: number, endIndex: number, id: string) =>
      dispatch(categoryActions.moveCategory(startIndex, endIndex, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
