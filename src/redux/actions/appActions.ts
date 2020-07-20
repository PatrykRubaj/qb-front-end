import { History } from "history";
import * as appTypes from "../types/appTypes";
import { RootState } from "../reducers";

const requestLoadState = (
  history: History<History.PoorMansUnknown>
): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_STATE_LOAD,
    history,
  };
};

const requestLoadStateFinished = (
  state: RootState
): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_STATE_LOAD_FINISHED,
    state,
  };
};

export default {
  requestLoadState,
  requestLoadStateFinished,
};
