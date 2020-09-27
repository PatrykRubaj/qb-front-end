import * as React from "react";
import { RootState } from "../redux/reducers";
import { ErrorResponse } from "../redux/state";
import { connect } from "react-redux";
import TableChartIcon from "@material-ui/icons/TableChart";
import EmailIcon from "@material-ui/icons/Email";
import ErrorIcon from "@material-ui/icons/Error";
import Head from "next/head";

// interface DispatchProps {
//   moveSubcategory: (startIndex: number, endIndex: number, id: string) => void;
// }

interface StateProps {
  spreadsheetUrl?: string;
  errors?: ErrorResponse;
  isNewsletterSubscriber?: boolean;
}

type Props = StateProps;

export const GeneratorResponse: React.FC<Props> = ({
  spreadsheetUrl,
  errors,
  isNewsletterSubscriber,
}: Props) => {
  if (!errors && spreadsheetUrl) {
    return (
      <>
        <Head>
          <title>Spreadsheet generated - Quantum Budget</title>
        </Head>
        <div className="alert alert-success mt-1 mb-1" role="alert">
          Your spreadsheet is ready.
        </div>
        <div className="row justify-content-center">
          <div className="col-9 col-xs-7 col-md-5 col-lg-3">
            <a
              href={spreadsheetUrl}
              style={{ display: "block" }}
              className="mt-2 btn btn-light btn-lg"
            >
              <div style={{ textAlign: "center" }}>
                <p>
                  <TableChartIcon htmlColor="#000" style={{ fontSize: 64 }} />
                </p>
                <p>Link to Your budget</p>
              </div>
            </a>
          </div>
        </div>
        {isNewsletterSubscriber && isNewsletterSubscriber === true && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-7">
              <div className="media mt-4">
                <EmailIcon
                  htmlColor="#000"
                  fontSize="large"
                  className="align-self-center mr-3"
                />
                <div className="media-body">
                  <h5 className="mt-0">Newsletter</h5>
                  <p>
                    Thank You for joining my newsletter.{" "}
                    <strong>Remember to confirm Your subscribction.</strong>{" "}
                    Otherwise I won&apos;t be able to stay in touch with You.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (errors) {
    return (
      <>
        <Head>
          <title>Generator failed - Quantum Budget</title>
        </Head>
        <div className="alert alert-danger mt-1 mb-1" role="alert">
          <p>There was an error when generating you spreadsheet.</p>
          <hr />
          <p className="mb-0">
            If you didn&apos;t allow access to Google Drive, go back to
            Generator tab, generate budget again and don&apos;t forget to allow
            access to Google Drive.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            <div className="media mt-4">
              <ErrorIcon
                htmlColor="#000"
                fontSize="large"
                className="align-self-center mr-3"
              />
              <div className="media-body">
                <h5 className="mt-0">Error message</h5>
                <p>{errors?.message}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    spreadsheetUrl: state.budgetSection.response?.spreadsheetUrl,
    errors: state.budgetSection.response?.errors,
    isNewsletterSubscriber: state.userSection.agreedToNewsletter,
  };
};

export default connect(mapStateToProps)(GeneratorResponse);
