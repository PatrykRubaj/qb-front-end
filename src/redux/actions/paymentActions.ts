import { PriceTier } from "../state";
import * as paymentTypes from "../types/paymentTypes";

const requestSessionId = (price: PriceTier): paymentTypes.PaymentActionType => {
  return {
    type: paymentTypes.REQUEST_SESSION_ID,
    price,
  };
};

const requestSessionIdFinished = (
  sessionId: string
): paymentTypes.PaymentActionType => {
  return {
    type: paymentTypes.REQUEST_SESSION_ID_FINISHED,
    sessionId,
  };
};

export default {
  requestSessionId,
  requestSessionIdFinished,
};
