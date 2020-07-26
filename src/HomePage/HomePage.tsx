import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LockIcon from "@material-ui/icons/Lock";
import AssessmentIcon from "@material-ui/icons/Assessment";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import GridOnIcon from "@material-ui/icons/GridOn";

const HomePageComponent: React.FC = () => {
  return (
    <>
      <div className="row mb-0 justify-content-center">
        <div className="col-lg-7 col">
          <h1 className="display-4">Is Your money properly spent?</h1>
          <p className="lead">Many want the answer, not many put the effort.</p>
        </div>
      </div>
      <div className="row pt-2 pb-2 justify-content-center">
        <div className="col-lg-7 col-sm">
          <div className="media mt-5">
            <LineStyleIcon
              className="align-self-center mr-3"
              htmlColor="#f9c784"
              style={{ fontSize: 64 }}
            />
            <div className="media-body">
              <h5 className="mt-0">Always know what You can afford</h5>
              <p>
                Dashboard allows You to glance at You current spendings and
                simplify the decision making.
              </p>
            </div>
          </div>
          <div className="media mt-5">
            <div className="media-body">
              <h5 className="mt-0">Effortlessly see how You spend the money</h5>
              <p>
                Are You a visual person or You don’t really like numbers? It’s
                not a problem, because looking at a few simple charts is a
                powerful way to get insight into your home finances.
              </p>
            </div>
            <AssessmentIcon
              className="align-self-center ml-3"
              htmlColor="#5b7191"
              style={{ fontSize: 64 }}
            />
          </div>
          <div className="media mt-5">
            <LockIcon
              className="align-self-center mr-3"
              htmlColor="#212121"
              style={{ fontSize: 64 }}
            />
            <div className="media-body">
              <h5 className="mt-0">You’re not the product</h5>
              <p>
                Privacy is dying, but you don’t want to give up without a fight.
                Good, because Your spreadsheet is stored securely on your Google
                Drive account.
              </p>
            </div>
          </div>
          <div className="media mt-5">
            <div className="media-body">
              <h5 className="mt-0">How much I differ from others?</h5>
              <div className="table-responsive table-borderless">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center">YNAB</th>
                      <th className="text-center">Mint</th>
                      <th className="text-center">Quantum Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Privacy</th>
                      <td className="text-center">Yes</td>
                      <td className="text-center">No</td>
                      <td className="text-center">Yes</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td className="text-center">$11.99</td>
                      <td className="text-center">Free</td>
                      <td className="text-center">Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="media mt-5">
            <div className="media-body">
              <h5 className="mt-0">Share with loved ones</h5>
              <p>
                Cloud is for sharing and using Google Spreadsheets allows to
                share the home budget with people that are important to You.
              </p>
            </div>
            <FavoriteIcon
              className="align-self-center ml-3"
              htmlColor="#bc1e1b"
              style={{ fontSize: 64 }}
            />
          </div>
          <div className="media mt-5">
            <GridOnIcon
              className="align-self-center mr-3"
              htmlColor="#d5e098"
              style={{ fontSize: 64 }}
            />
            <div className="media-body">
              <h5 className="mt-0">Easy to use</h5>
              <p>
                Budgeting and spreadsheets are basically synonyms. If You used
                spreadsheets before You can use Quantum Budget.
              </p>
            </div>
          </div>
          <div className="media mt-3 mb-3">
            <Link to="/generator" className="btn btn-primary btn-lg btn-block">
              Go to Spreadsheet Generator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageComponent;
