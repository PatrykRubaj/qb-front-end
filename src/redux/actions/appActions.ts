import * as appTypes from "../types/appTypes";
import { RootState } from "../reducers";

const requestLoadState = (): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_STATE_LOAD,
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
