import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Category, Subcategory } from "../state";
import { v4 as uuidv4 } from "uuid";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";

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

  const onNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    setNewSubcategory({
      ...newSubcategory,
      [name]: value
    });
  };

  const onSelectCategoryClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ): void => {
    e.preventDefault();

    setNewSubcategory({ ...newSubcategory, categoryId: category.id });

    subcategoryInput.current?.focus();
    subcategoryInput.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const onSubcategorySubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      categories.find(x => x.id === newSubcategory.categoryId) === undefined
    ) {
      return;
    }

    editMode ? editSubcategory(newSubcategory) : addSubcategory(newSubcategory);

    setNewSubcategory({
      ...newSubcategory,
      id: uuidv4(),
      name: "",
      amount: null
    });
    setEditMode(false);

    subcategoryInput.current?.focus();
    subcategoryInput.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
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

      subcategoryInput.current?.focus();
      subcategoryInput.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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
        <h2>Subcategories</h2>
        <form onSubmit={onSubcategorySubmit}>
          <div className="fom-row">
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
              Category:{" "}
              {categories.filter(x => x.id === newSubcategory.categoryId)[0]
                ?.name || ""}
            </label>
          </div>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Subcategory"
                name="name"
                value={newSubcategory.name}
                onChange={onNameChange}
                ref={subcategoryInput}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                {editMode ? "Save" : "+ Add"}
              </button>
            </div>
          </div>
        </form>

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
