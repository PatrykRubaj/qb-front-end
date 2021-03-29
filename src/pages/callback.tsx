import React from "react";
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
  handleCallback: (history: NextRouter) => void;
}

type Props = DispatchProps;

const Callback = ({ loadState, handleCallback }: Props) => {
  const router = useRouter();
  React.useEffect(() => {
    loadState(router);
    handleCallback(router);
  }, [router, loadState, handleCallback]);

  return (
    <>
      <Head>
        <title>Callback - Quantum Budget</title>
      </Head>
      <LoaderWheel title="Logging in" description="Please wait." />
    </>
  );
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadState: (history: NextRouter): AppActionTypes =>
      dispatch(appActions.requestLoadState(history)),
    handleCallback: (history: NextRouter): AuthActionTypes =>
      dispatch(authActions.requestCallback(history)),
  };
};

export default connect(null, mapDispatchToProps)(Callback);
