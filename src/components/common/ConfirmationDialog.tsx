import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  title: string;
  description: string;
  children?(confirm: Function): React.ReactElement | null | undefined;
}

interface State {
  open: boolean;
  callback: Function | null;
}

const ConfirmationDialog = (props: Props) => {
  const { title, description } = props;

  const [state, setState] = useState<State>({
    open: false,
    callback: null,
  });

  function show(callback: Function, param: any): Function {
    return function (event: React.MouseEvent<HTMLButtonElement>): void {
      event.preventDefault();
      event = {
        ...event,
        target: { ...event.target },
      };

      setState({
        open: true,
        callback: () => callback(event, param),
      });
    };
  }

  const hide = (): void => setState({ open: false, callback: null });

  const confirm = (): void => {
    if (state.callback) {
      state.callback();
    }
    hide();
  };

  return (
    <>
      {props.children ? props.children(show) : <></>}
      {state.open && (
        <Dialog
          open={state.open}
          onClose={(): void => hide()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => hide()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => confirm()}
            >
              Delete
            </button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmationDialog;
