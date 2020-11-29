import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import { AuthActionTypes } from "../redux/types/authTypes";
import LoaderWheel from "../components/common/LoaderWheel";
import { AppActionTypes } from "../redux/types/appTypes";
import appActions from "../redux/actions/appActions";
import Head from "next/head";

interface DispatchProps {
  loadState: (history: NextRouter) => AppActionTypes;
}

type Props = DispatchProps;

const Callback: React.FC<Props> = ({ loadState }: Props) => {
  const router = useRouter();
  React.useEffect(() => {
    // loadState(router);
  }, [router, loadState]);

  return (
    <>
      <Head>
        <title>Loading - Quantum Budget</title>
      </Head>
      <LoaderWheel description="I'm working on it." title="Loading" />
    </>
  );
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadState: (history: NextRouter): AppActionTypes =>
      dispatch(appActions.requestLoadState(history)),
  };
};

export default connect(null, mapDispatchToProps)(Callback);
