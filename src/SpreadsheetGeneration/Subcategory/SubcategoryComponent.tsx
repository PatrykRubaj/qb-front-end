import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, Subcategory, EntityStatus } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import SubcategoryForm from "./SubcategoryForm";
import { RootState } from "../../redux/reducers";
import { connect } from "react-redux";

interface Props {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  addSubcategory: Function;
  editSubcategory: Function;
  deleteSubcategory: Function;
}

const SubcategoryComponent: React.FC<Props> = ({
  categories,
  subcategories,
  addSubcategory,
  editSubcategory,
  deleteSubcategory
}: Props) => {
  const [newSubcategory, setNewSubcategory] = useState<Subcategory>({
    id: uuidv4(),
    name: "",
    categoryId: "",
    amount: null,
    status: EntityStatus.New
  });
  const [showWarning, setShowWarning] = useState(false);

  const subcategoryInput = React.createRef<HTMLInputElement>();
  const subcategoriesHeader = React.createRef<HTMLHeadingElement>();

  const onSelectCategoryClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    setNewSubcategory({ ...newSubcategory, categoryId: category.id });

    subcategoriesHeader.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
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

    setNewSubcategory({
      ...subcategory,
      id: uuidv4(),
      name: "",
      amount: null,
      status: EntityStatus.New
    });

    subcategoriesHeader.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
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
      setNewSubcategory(subcategory);
      editSubcategory(subcategory);
      subcategoriesHeader.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      subcategoryInput.current?.focus();
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="row">
      <WarningDialog
        title="Finish editing entry"
        description="You can't edit entry when another is already edited"
        show={showWarning}
        onExit={(): void => setShowWarning(false)}
      />
      <div className="col">
        <h2 ref={subcategoriesHeader}>Subcategories</h2>

        {categories.length > 0 ? (
          <>
            <SubcategoryForm
              addSaveNewSubcategory={onSubcategorySubmit}
              newSubcategory={newSubcategory}
              subcategoryNameInputRef={subcategoryInput}
              categories={categories}
              subcategories={subcategories.filter(
                x => x.categoryId === newSubcategory.categoryId
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

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories,
    subcategories: state.subcategories
  };
};

export default connect(mapStateToProps)(SubcategoryComponent);
