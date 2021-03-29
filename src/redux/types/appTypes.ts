import { NextRouter } from 'next/router';
import { RootState } from '../reducers';

export const REQUEST_STATE_LOAD = 'REQUEST_STATE_LOAD';
export const REQUEST_STATE_LOAD_FINISHED = 'REQUEST_STATE_LOAD_FINISHED';

interface RequestStateLoadAction {
  type: typeof REQUEST_STATE_LOAD;
  history: NextRouter;
}

interface RequestStateLoadFinishedAction {
  type: typeof REQUEST_STATE_LOAD_FINISHED;
  payload: RootState;
}

export type AppActionTypes =
  | RequestStateLoadAction
  | RequestStateLoadFinishedAction;
