import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { RootState } from "../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import { AuthActionTypes } from "../redux/types/authTypes";
import LoaderWheel from "../components/common/LoaderWheel";
import { useEffect } from "react";

interface DispatchProps {
  login: (history: NextRouter) => void;
}

type Props = DispatchProps;

const Login: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    props.login(router);
  }, [router, props.login, props]);

  return (
    <>
      <Head>
        <title>Login redirect - Quantum Budget</title>
      </Head>
      <LoaderWheel
        title="Redirecting"
        description="You're being redirected to login"
      />
    </>
  );
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (history: NextRouter): AuthActionTypes =>
      dispatch(authActions.requestLogin(history)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
