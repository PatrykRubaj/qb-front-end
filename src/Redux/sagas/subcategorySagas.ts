import { take, put } from "redux-saga/effects";
import subcategoryActions from "../actions/subcategoryActions";
import * as subcategoryTypes from "../types/subcategoryTypes";

export function* deleteSubcategory() {
  while (true) {
    const { id } = yield take(subcategoryTypes.DELETE_SUBCATEGORY);
    yield put(subcategoryActions.deleteSubcategoryFinished(id));
  }
}

export function* addSubcategory() {
  while (true) {
    const { payload } = yield take(subcategoryTypes.ADD_SUBCATEGORY);
    yield put(subcategoryActions.addSubcategoryFinished(payload));
  }
}

export function* editSubcategory() {
  while (true) {
    const { payload } = yield take(subcategoryTypes.EDIT_SUBCATEGORY);
    yield put(subcategoryActions.editSubcategoryFinished(payload));
  }
}

export function* setSubcategoryFormValues() {
  while (true) {
    const { payload } = yield take(subcategoryTypes.SET_SUBCATEGORY_FORM);
    yield put(subcategoryActions.setSubcategoryFormValuesFinished(payload));
  }
}

export function* setSubcategoryPromptVisibility() {
  while (true) {
    const { isVisible } = yield take(
      subcategoryTypes.SET_SUBCATEGORY_PROMPT_VISIBILITY
    );
    yield put(
      subcategoryActions.setSubcategoryPromptVisibilityFinished(isVisible)
    );
  }
}

export function* enterSubcategoryAmountVisibility() {
  while (true) {
    const { id, amount } = yield take(
      subcategoryTypes.ENTER_SUBCATEGORY_AMOUNT
    );
    yield put(subcategoryActions.enterSubcategoryAmountFinished(id, amount));
  }
}
