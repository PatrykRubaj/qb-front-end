import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface NewsletterProps {
  show: boolean;
  handleClose: Function;
  onClose: Function;
}

const NewsletterComponent: React.FC<NewsletterProps> = (
  props: NewsletterProps
) => {
  return (
    <Dialog
      open={props.show}
      TransitionComponent={Transition}
      keepMounted={false}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      onClose={() => props.onClose()}
    >
      {/* eslint-disable-next-line */}
      <DialogTitle id="alert-dialog-slide-title" className="mb-0 pb-0">
        🔥 Join Quantum Budget&apos;s community{" "}
        <span className="badge badge-secondary">(optional)</span>
      </DialogTitle>
      <DialogContent className="mt-0 pt-0">
        <List component="ul" className="mt-0 pt-0">
          <ListItem className="p-1">
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary="Budget under control"
              // eslint-disable-next-line
              secondary="All money has it's place 💰"
            />
          </ListItem>
          <ListItem className="p-1">
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary="You're going to be informed first"
              // eslint-disable-next-line
              secondary="New, online version is in constant development 💻"
            />
          </ListItem>
          <ListItem className="p-1">
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary="Less stress"
              // eslint-disable-next-line
              secondary="Now You know You can't afford everything 😉"
            />
          </ListItem>
        </List>
        <DialogContentText id="alert-dialog-slide-description" className="">
          Don&apos;t forget to click the button in{" "}
          <strong>the confirmation email</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ display: "block" }} className="text-center">
        <button
          onClick={(): void => props.handleClose(true)}
          type="button"
          className="btn btn-primary btn-lg btn-block"
        >
          Yes, I want to control my finances
        </button>
        <button
          onClick={(): void => props.handleClose(false)}
          type="button"
          className="btn btn-link btn-sm mt-2"
        >
          No, I prefer to be stressed
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default NewsletterComponent;
