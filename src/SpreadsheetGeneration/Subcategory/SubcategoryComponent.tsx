import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

const SubcategoryComponent: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <h2>Subcategories</h2>
        <form>
          <div className="fom-row">
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
              Category: Food
            </label>
          </div>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Subcategory"
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary">
                + Add
              </button>
            </div>
          </div>
        </form>
        <List subheader={<li />}>
          {[0, 1, 2, 3, 4].map(sectionId => (
            <li key={`section-${sectionId}`}>
              <ul style={{ listStyle: "none", paddingInlineStart: 0 }}>
                <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                {[0, 1, 2].map(item => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                    <ListItemSecondaryAction>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary">
                          <EditIcon />
                        </button>
                        <button type="button" className="btn btn-secondary">
                          <DeleteIcon />
                        </button>
                      </div>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SubcategoryComponent;
