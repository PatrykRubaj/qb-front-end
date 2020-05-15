import { createStore } from "redux";
import { rootReducer } from "./reducers";

export default function getStore() {
  const store = createStore(rootReducer);

  return store;
}
