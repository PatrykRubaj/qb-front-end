import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const getStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return store;
};

export default getStore;
