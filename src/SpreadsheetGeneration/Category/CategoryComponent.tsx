import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const CategoryComponent: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <h2>Categories</h2>
        <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary">
                + Add
              </button>
            </div>
          </div>
        </form>

        <table className="table table-borderless table-sm mt-2">
          <thead className="thead-light">
            <tr>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">Food</td>
              <td className="align-middle text-center">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-secondary">
                    <EditIcon />
                  </button>
                  <button type="button" className="btn btn-secondary">
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-middle">Utilites</td>
              <td className="align-middle text-center">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-secondary">
                    <EditIcon />
                  </button>
                  <button type="button" className="btn btn-secondary">
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-middle">Entertainment</td>
              <td className="align-middle text-center">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-secondary">
                    <EditIcon />
                  </button>
                  <button type="button" className="btn btn-secondary">
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryComponent;
