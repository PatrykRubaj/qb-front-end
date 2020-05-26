import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, Subcategory, EntityStatus } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import SubcategoryForm from "./SubcategoryForm";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import subcategoryActions from "../../redux/actions/subcategoryActions";
import * as subcategoryTypes from "../../redux/types/subcategoryTypes";

interface DispatchProps {
  addSubcategory: (subcategory: Subcategory) => void;
  editSubcategory: (subcategory: Subcategory) => void;
  deleteSubcategory: (subcategory: Subcategory) => void;
  setSubcategoryFormValues: (subcategory: Subcategory) => void;
  setSubcategoryPromptVisibility: (isVisible: boolean) => void;
}

interface StateProps {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  formValues: Subcategory;
  onlyOneEditAllowedPrompt: boolean;
}

type Props = StateProps & DispatchProps;

const SubcategoryComponent: React.FC<Props> = ({
  categories,
  subcategories,
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
  setSubcategoryFormValues,
  formValues,
  onlyOneEditAllowedPrompt,
  setSubcategoryPromptVisibility,
}: Props) => {
  const subcategoryInput = React.createRef<HTMLInputElement>();
  const subcategoriesHeader = React.createRef<HTMLHeadingElement>();

  const onSelectCategoryClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    setSubcategoryFormValues({ ...formValues, categoryId: category.id });

    subcategoriesHeader.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    subcategoryInput.current?.focus();
  };

  const onSubcategorySubmit = (subcategory: Subcategory): void => {
    if (categories.find(x => x.id === subcategory.categoryId) === undefined) {
      return;
    }

    const subcategoryToSave = { ...subcategory, status: EntityStatus.Saved };

    subcategory.status === EntityStatus.Editing
      ? editSubcategory(subcategoryToSave)
      : addSubcategory(subcategoryToSave);

    setSubcategoryFormValues({
      ...subcategory,
      id: uuidv4(),
      name: "",
      amount: null,
      status: EntityStatus.New,
    });

    subcategoriesHeader.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    subcategoryInput.current?.focus();
  };

  const onSubcategoryDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    subcategory: Subcategory
  ): void => {
    deleteSubcategory(subcategory);
  };

  const onSubcategoryEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    subcategory: Subcategory
  ): void => {
    e.preventDefault();

    if (
      subcategories.filter(x => x.status === EntityStatus.Editing).length === 0
    ) {
      subcategory = { ...subcategory, status: EntityStatus.Editing };
      setSubcategoryFormValues(subcategory);
      subcategoriesHeader.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      subcategoryInput.current?.focus();
    } else {
      setSubcategoryPromptVisibility(true);
    }
  };

  return (
    <div className="row">
      <WarningDialog
        title="Finish editing entry"
        description="You can't edit entry when another is already edited"
        show={onlyOneEditAllowedPrompt}
        onExit={(): void => setSubcategoryPromptVisibility(false)}
      />
      <div className="col">
        <h2 ref={subcategoriesHeader}>Subcategories</h2>

        {categories.length > 0 ? (
          <>
            <SubcategoryForm
              addSaveNewSubcategory={onSubcategorySubmit}
              newSubcategory={formValues}
              subcategoryNameInputRef={subcategoryInput}
              categories={categories}
              subcategories={subcategories.filter(
                x => x.categoryId === formValues.categoryId
              )}
            />

            {categories.map(category => {
              const filteredSubcategories = subcategories.filter(
                x => x.categoryId === category.id
              );
              return (
                <table
                  className="table table-borderless table-sm mt-2"
                  key={category.id}
                >
                  <thead className="thead-light">
                    <tr>
                      <th>
                        Subcategories for {category.name}
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm ml-1"
                          onClick={(e): void =>
                            onSelectCategoryClick(e, category)
                          }
                        >
                          Select category
                        </button>
                      </th>
                      <th className="text-center" style={{ width: "10%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubcategories.length > 0 ? (
                      filteredSubcategories.map(subcategory => (
                        <tr key={subcategory.id}>
                          <td className="align-middle">{subcategory.name}</td>
                          <td className="align-middle text-center">
                            <div className="btn-group" role="group">
                              <button
                                disabled={
                                  subcategory.status === EntityStatus.Editing
                                }
                                type="button"
                                className="btn btn-secondary"
                                onClick={(e): void =>
                                  onSubcategoryEditClick(e, subcategory)
                                }
                              >
                                <EditIcon />
                              </button>
                              <ConfirmationDialog
                                title="Delete subcategory?"
                                description="Do You want to delete subcategory?"
                              >
                                {confirm => {
                                  return (
                                    <button
                                      disabled={
                                        subcategory.status ===
                                        EntityStatus.Editing
                                      }
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={confirm(
                                        onSubcategoryDeleteClick,
                                        subcategory
                                      )}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  );
                                }}
                              </ConfirmationDialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2}>
                          <div
                            className="alert alert-warning align-middle"
                            role="alert"
                          >
                            <span>
                              No subcategories -{" "}
                              <button
                                type="button"
                                className="btn btn-link p-0 alert-link border-0 align-baseline"
                                onClick={(e): void =>
                                  onSelectCategoryClick(e, category)
                                }
                              >
                                add subcategory
                              </button>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              );
            })}
          </>
        ) : (
          <div className="alert alert-warning align-middle" role="alert">
            <span>Add categories first.</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    categories: state.categoriesSection.categories,
    subcategories: state.subcategorySection.subcategories,
    formValues: state.subcategorySection.formValues,
    onlyOneEditAllowedPrompt: state.subcategorySection.onlyOneEditAllowedPrompt,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteSubcategory: (
      subcategory: Subcategory
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(subcategoryActions.deleteSubcategory(subcategory)),
    addSubcategory: (
      subcategory: Subcategory
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(subcategoryActions.addSubcategory(subcategory)),
    editSubcategory: (
      subcategory: Subcategory
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(subcategoryActions.editSubcategory(subcategory)),
    setSubcategoryFormValues: (
      subcategory: Subcategory
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(subcategoryActions.setSubcategoryFormValues(subcategory)),
    setSubcategoryPromptVisibility: (
      isVisible: boolean
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(subcategoryActions.setSubcategoryPromptVisibility(isVisible)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubcategoryComponent);
