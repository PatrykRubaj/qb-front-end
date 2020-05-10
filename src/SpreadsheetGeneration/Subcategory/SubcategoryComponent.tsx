import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, Subcategory } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import SubcategoryForm from "./SubcategoryForm";

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
    amount: null
  });
  const [editMode, setEditMode] = useState<boolean>(false);
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

    editMode ? editSubcategory(subcategory) : addSubcategory(subcategory);

    setNewSubcategory({
      ...subcategory,
      id: uuidv4(),
      name: "",
      amount: null
    });
    setEditMode(false);

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
    // e.preventDefault();
    deleteSubcategory(subcategory);
  };

  const onSubcategoryEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    subcategory: Subcategory
  ): void => {
    e.preventDefault();

    if (editMode === false) {
      deleteSubcategory(subcategory);

      setNewSubcategory(subcategory);
      setEditMode(true);

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
        <SubcategoryForm
          editMode={editMode}
          addSaveNewSubcategory={onSubcategorySubmit}
          newSubcategory={newSubcategory}
          subcategoryNameInputRef={subcategoryInput}
          categories={categories}
          subcategories={subcategories.filter(
            x => x.categoryId === newSubcategory.categoryId
          )}
        />

        {categories.map(category => (
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
                    onClick={(e): void => onSelectCategoryClick(e, category)}
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
              {subcategories
                .filter(x => x.categoryId === category.id)
                .map(subcategory => (
                  <tr key={subcategory.id}>
                    <td className="align-middle">{subcategory.name}</td>
                    <td className="align-middle text-center">
                      <div className="btn-group" role="group">
                        <button
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
                ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryComponent;
