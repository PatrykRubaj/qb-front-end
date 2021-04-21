import { initialState } from "../initialsState";
import * as paymentTypes from "../types/paymentTypes";
import { PaymentSection } from "../state";

export default function paymentReducer(
  paymentSection: PaymentSection = initialState.paymentSection,
  action: paymentTypes.PaymentActionType
) {
  switch (action.type) {
    case paymentTypes.REQUEST_SESSION_ID_FINISHED:
      return {
        ...paymentSection,
        sessionId: action.sessionId,
      };
    default:
      return paymentSection;
  }
}
