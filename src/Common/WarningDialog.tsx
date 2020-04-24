import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  title: string;
  description: string;
  show: boolean;
  onExit: Function;
}

const WarningDialog: React.FC<Props> = (props: Props) => {
  const { title, description, show, onExit } = props;

  return (
    <Dialog
      open={show}
      onClose={(): void => onExit()}
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
          onClick={(): void => onExit()}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
