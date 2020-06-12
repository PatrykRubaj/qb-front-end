import * as React from "react";
import { History } from "history";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import authActions from "../../redux/actions/authActions";
import { AuthActionTypes } from "../../redux/types/authTypes";

interface StateProps {
  history: History<History.PoorMansUnknown>;
}

interface OwnProps {
  history: History<History.PoorMansUnknown>;
}

interface DispatchProps {
  login: (history: History<History.PoorMansUnknown>) => void;
}

type Props = StateProps & DispatchProps;

const Login: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    props.login(props.history);
  }, [props.history, props.login, props]);

  return null;
};

export const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps
): StateProps => ({
  history: ownProps.history,
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (history: History<History.PoorMansUnknown>): AuthActionTypes =>
      dispatch(authActions.requestLogin(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
