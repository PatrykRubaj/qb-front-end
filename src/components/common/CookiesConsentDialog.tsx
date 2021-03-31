import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from 'next/link';
import { Route } from '../../redux/state';

interface Props {
  children?(confirm: Function): React.ReactElement | null | undefined;
}

interface State {
  open: boolean;
  callback: Function | null;
}

const CookieConsentDialog = (props: Props) => {
  const [state, setState] = useState<State>({
    open: true,
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
          <DialogTitle id="alert-dialog-title">
            My website uses cookies 🍪
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>
                ⚙ Necessary - these cookies can't be turned off and are required
                for proper functioning of the website.
              </p>
              <p>
                📈 Statistics - these cookies allow me to measure user's
                sattisfaction from using my website.
              </p>
              <p>
                📣 Marketing - these types of cookies help my website to grow.
              </p>
              <p>
                <a>
                  <Link href={Route.PrivacyPolicy}>Cookies policy</Link>
                </a>
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => hide()}
            >
              Advenced options
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => confirm()}
            >
              I Accept
            </button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CookieConsentDialog;
