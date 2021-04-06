import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from 'next/link';
import { Dispatch } from 'redux';
import {
  CookieConsent,
  CookieConsentDialogState,
  DialogState,
  Route,
} from '../../redux/state';
import { setCookies, setCookieConsentDialog } from '../../features/user/slice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import appActions from '../../redux/actions/appActions';
import GoogleAnalytics from './googleAnalytics';

interface StateProps {
  open: boolean;
  display: DialogState;
  essential: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface DispatchProps {
  setCookies: (cookiesConsent: CookieConsent) => void;
  setCookieConsentDialog: (cookiesConsent: CookieConsentDialogState) => void;
  persistConsentInCookie: (cookieConsent: CookieConsent) => void;
  requestReadCookieConsent: () => void;
}

type Props = StateProps & DispatchProps;

function CookieConsentDialog(props: Props) {
  const {
    open,
    display,
    setCookies,
    setCookieConsentDialog,
    persistConsentInCookie,
    requestReadCookieConsent,
  } = props;

  useEffect(() => {
    requestReadCookieConsent();
  }, []);

  const [cookieConsentState, setCookieConsentState] = useState<CookieConsent>({
    essential: true,
    statistics: false,
    marketing: false,
  });

  const showAdvencedSettings = (): void => {
    setCookieConsentDialog({ open, state: DialogState.AdvencedSettings });
  };
  const hide = (): void =>
    setCookieConsentDialog({
      open: false,
      state: DialogState.BasicInformation,
    });

  const onSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setCookieConsentState({
      ...cookieConsentState,
      essential: true,
      [event.target.name]: checked,
    });
  };

  const saveChanges = (): void => {
    debugger;
    setCookies(cookieConsentState);
    persistConsentInCookie(cookieConsentState);
    hide();
  };

  const acceptAll = (): void => {
    const agreedToAllCookies = {
      essential: true,
      statistics: true,
      marketing: true,
    };

    debugger;
    setCookieConsentState(agreedToAllCookies);
    setCookies(agreedToAllCookies);
    persistConsentInCookie(agreedToAllCookies);

    hide();
  };

  const outerComponent = () => (
    <>
      <GoogleAnalytics />
      <Dialog
        open={open}
        onClose={(): void => hide()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-title">
          My website uses cookies 🍪
        </DialogTitle>
        {display == DialogState.BasicInformation
          ? basicInformationComponent()
          : display == DialogState.AdvencedSettings
          ? advencedSettingsComponent()
          : basicInformationComponent()}
      </Dialog>
    </>
  );

  const basicInformationComponent = () => (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ⚙ Necessary - these cookies can't be turned off and are required for
          proper functioning of the website.
          <br />
          📈 Statistics - these cookies allow me to measure user's sattisfaction
          from using my website.
          <br />
          📣 Marketing - these types of cookies help my website to grow.
          <br />
          <Link href={Route.PrivacyPolicy}>
            <a>Cookie policy</a>
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => showAdvencedSettings()}
        >
          Advenced options
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => acceptAll()}
        >
          I Accept
        </button>
      </DialogActions>
    </>
  );

  const advencedSettingsComponent = () => (
    <>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select cookies You allow</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={cookieConsentState.essential}
                  onChange={onSwitchChange}
                  name="essential"
                  disabled={true}
                  required={true}
                  color="primary"
                />
              }
              label="Essential (required)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={cookieConsentState.statistics}
                  onChange={onSwitchChange}
                  name="statistics"
                  color="primary"
                />
              }
              label="Statistics"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={cookieConsentState.marketing}
                  onChange={onSwitchChange}
                  name="marketing"
                  color="primary"
                />
              }
              label="Marketing"
            />
          </FormGroup>
        </FormControl>
        <DialogContentText id="alert-dialog-description">
          ⚙ Necessary - these cookies can't be turned off and are required for
          proper functioning of the website.
          <br />
          📈 Statistics - these cookies allow me to measure user's sattisfaction
          from using my website.
          <br />
          📣 Marketing - these types of cookies help my website to grow.
          <br />
          <Link href={Route.PrivacyPolicy}>
            <a>Cookie policy</a>
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => saveChanges()}
        >
          Save changes
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => acceptAll()}
        >
          Accept all cookies
        </button>
      </DialogActions>
    </>
  );

  {
    return open && outerComponent();
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    open: state.userSection.cookieConsentDialog.open,
    display: state.userSection.cookieConsentDialog.state,
    essential: state.userSection.cookiesConsent.essential,
    statistics: state.userSection.cookiesConsent.statistics,
    marketing: state.userSection.cookiesConsent.marketing,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setCookies: (cookiesConsent: CookieConsent) =>
      dispatch(setCookies(cookiesConsent)),
    setCookieConsentDialog: (cookiesConsent: CookieConsentDialogState) =>
      dispatch(setCookieConsentDialog(cookiesConsent)),
    persistConsentInCookie: (cookiesConsent: CookieConsent) =>
      dispatch(appActions.requestSaveCookiesConsent(cookiesConsent)),
    requestReadCookieConsent: () =>
      dispatch(appActions.requestReadCookiesConsent()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CookieConsentDialog);
