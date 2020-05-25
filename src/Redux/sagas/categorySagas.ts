import { take, put } from "redux-saga/effects";
import categoryActions from "../actions/categoryActions";
import * as categoryTypes from "../types/categoryTypes";

export function* deleteCategory() {
  while (true) {
    const { id } = yield take(categoryTypes.DELETE_CATEGORY);
    yield put(categoryActions.deleteCategoryFinished(id));
  }
}

export function* addCategory() {
  while (true) {
    const { payload } = yield take(categoryTypes.ADD_CATEGORY);
    yield put(categoryActions.addCategoryFinished(payload));
  }
}

export function* editCategory() {
  while (true) {
    const { payload } = yield take(categoryTypes.EDIT_CATEGORY);
    yield put(categoryActions.editCategoryFinished(payload));
  }
}

export function* setCategoryFormValues() {
  while (true) {
    const { payload } = yield take(categoryTypes.SET_CATEGORY_FORM);
    yield put(categoryActions.setCategoryFormValuesFinished(payload));
  }
}

export function* setPromptVisibility() {
  while (true) {
    const { isVisible } = yield take(
      categoryTypes.SET_CATEGORY_PROMPT_VISIBILITY
    );
    yield put(categoryActions.setCategoryPromptVisibilityFinished(isVisible));
  }
}
