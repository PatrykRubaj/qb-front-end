import { PaymentErrorMessage, PriceTier } from "../state";

export const REQUEST_SESSION_ID = "REQUEST_SESSION_ID";
export const REQUEST_SESSION_ID_FINISHED = "REQUEST_SESSION_ID_FINISHED";
export const REQUEST_SESSION_ID_FAILED = "REQUEST_SESSION_ID_FAILED";

interface RequestSessionIdAction {
  type: typeof REQUEST_SESSION_ID;
  price: PriceTier;
}

interface RequestSessionIdFinishedAction {
  type: typeof REQUEST_SESSION_ID_FINISHED;
  sessionId: string;
}

interface RequestSessionIdFailedAction {
  type: typeof REQUEST_SESSION_ID_FAILED;
  errorMessage: PaymentErrorMessage;
}

export type PaymentActionType =
  | RequestSessionIdAction
  | RequestSessionIdFinishedAction
  | RequestSessionIdFailedAction;
