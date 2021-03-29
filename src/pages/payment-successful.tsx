import React from 'react';
import { Route } from '../redux/state';
import Head from 'next/head';
import MessageIcon from '@material-ui/icons/Message';
import dynamic from 'next/dynamic';

function PaymentSuccessful() {
  const DynamicSuccessfulPaymentComponent = dynamic(
    () => import('../components/payments/SuccessfulPaymentComponent'),
    {
      ssr: false,
    }
  );

  return (
    <>
      <Head>
        <title>Payment successful - Quantum Budget</title>
      </Head>
      <div className="alert alert-success mt-1 mb-1" role="alert">
        <p>Thank You for the payment 🤗</p>
        <hr />
        <p className="mb-0">
          Your budget is going to be generated.
          {/* Finish Your budget{" "}
          <Link href={Route.Generator}>
            <a className="font-weight-bold">here</a>
          </Link>
          , and everything is going to be ok. */}
        </p>
      </div>
      <div className="row justify-content-center my-2">
        <div className="col-9 col-xs-7 col-md-5 col-lg-3">
          <a
            href={Route.MessangerBot}
            style={{ display: 'block' }}
            className="mt-2 btn btn-light btn-lg"
            target="_blank"
          >
            <div style={{ textAlign: 'center' }}>
              <p>
                <MessageIcon htmlColor="#000" style={{ fontSize: 32 }} />
              </p>
              <p>Leave feedback</p>
            </div>
          </a>
        </div>
      </div>
      <DynamicSuccessfulPaymentComponent />
    </>
  );
}

export default PaymentSuccessful;
