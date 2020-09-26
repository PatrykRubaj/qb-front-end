import * as React from "react";
import { History } from "history";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import authActions from "../../redux/actions/authActions";
import { AuthActionTypes } from "../../redux/types/authTypes";
import LoaderWheel from "../../Common/LoaderWheel";

interface StateProps {
  history: History<History.PoorMansUnknown>;
}

interface OwnProps {
  history: History<History.PoorMansUnknown>;
}

interface DispatchProps {
  handleCallback: (history: History<History.PoorMansUnknown>) => void;
}

type Props = StateProps & DispatchProps;

const Callback: React.FC<Props> = ({ history, handleCallback }: Props) => {
  React.useEffect(() => {
    handleCallback(history);
  }, [history, handleCallback]);

  return (
    <LoaderWheel
      description="It can take some time if the website wasn't used for a while."
      title="Generating"
    />
  );
};

export const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps
): StateProps => ({
  history: ownProps.history,
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    handleCallback: (
      history: History<History.PoorMansUnknown>
    ): AuthActionTypes => dispatch(authActions.requestCallback(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
