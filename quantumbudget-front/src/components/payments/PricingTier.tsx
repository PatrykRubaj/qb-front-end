import React from 'react';
import PaymentIcon from '@material-ui/icons/Payment';
import SmallLoader from '../common/SmallLoader/SmallLoader.component';
import { PriceTier } from '../../redux/state';
import style from './PricingTier.module.css';

export interface StateProps {
  price: number;
  name: string;
  description: string;
  featuresList: string[];
  priceTier: PriceTier;
  redirectInPropgress: boolean;
  numberOfTrialDays: number;
}
export interface DispatchProps {
  onClick: (tier: PriceTier) => void;
}

type Props = StateProps & DispatchProps;

export default function PricingTier(props: Props) {
  return (
    <div className="col-sm-12 col-md col-xl-3 border rounded py-1 my-2 mx-1 d-flex flex-column">
      <h3 className="pt-2">
        {props.name} <span className="badge badge-secondary">{props.numberOfTrialDays} days trial</span>
      </h3>
      <p>{props.description}</p>
      <div className="text-center">
        <span
          className="d-inline-block font-weight-bold mr-4 mt-auto align-middle"
          style={{ fontSize: '2em' }}
        >
          ${props.price}
        </span>
        <span className="d-inline-block align-middle">
          per month <br />( VAT incl. )
        </span>
      </div>
      <hr className="my-3" />
      {props.featuresList.length > 0 && (
        <ul className="list-unstyled">
          {props.featuresList.map((feature, index) => (
            <li key={index}>✔ {feature}</li>
          ))}
        </ul>
      )}
      {props.redirectInPropgress == false ? (
        <button
          type="button"
          className={`btn btn-warning btn-lg btn-block mt-auto mb-1`}
          onClick={() => props.onClick(props.priceTier)}
        >
          {/* <PaymentIcon
            fontSize="large"
            className="mr-2 align-middle"
          ></PaymentIcon> */}
          Start your free trial
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-warning btn-lg btn-block mt-auto mb-1"
          disabled={true}
        >
          <SmallLoader className="mx-auto align-middle"></SmallLoader>
          Redirecting to payment
        </button>
      )}
    </div>
  );
}
