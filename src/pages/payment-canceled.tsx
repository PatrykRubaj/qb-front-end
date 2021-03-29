import React from "react";
import { RootState } from "../redux/reducers";
import { ErrorResponse, Route } from "../redux/state";
import { connect } from "react-redux";
import TableChartIcon from "@material-ui/icons/TableChart";
import EmailIcon from "@material-ui/icons/Email";
import ErrorIcon from "@material-ui/icons/Error";
import Head from "next/head";
import MessageIcon from "@material-ui/icons/Message";
import Link from "next/link";

function PaymentCanceled() {
  return (
    <>
      <Head>
        <title>Payment canceled - Quantum Budget</title>
      </Head>
      <div className="alert alert-danger mt-1 mb-1" role="alert">
        <p>You have canceled the subscription payment 😥</p>
        <hr />
        <p className="mb-0">
          Finish Your budget{" "}
          <Link href={Route.Generator}>
            <a className="font-weight-bold">here</a>
          </Link>
          , and everything is going to be ok.
        </p>
      </div>
      <div className="row justify-content-center my-2">
        <div className="col-9 col-xs-7 col-md-5 col-lg-3">
          <a
            href={Route.MessangerBot}
            style={{ display: "block" }}
            className="mt-2 btn btn-light btn-lg"
            target="_blank"
          >
            <div style={{ textAlign: "center" }}>
              <p>
                <MessageIcon htmlColor="#000" style={{ fontSize: 32 }} />
              </p>
              <p>Leave feedback</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default PaymentCanceled;
