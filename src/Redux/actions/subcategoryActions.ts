import { Subcategory } from "../../SpreadsheetGeneration/state";
import * as subcategoryTypes from "../types/subcategoryTypes";

const deleteSubcategory = (
  subcategoryToDelete: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.DELETE_SUBCATEGORY,
    id: subcategoryToDelete.id,
  };
};

const deleteSubcategoryFinished = (
  id: string
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.DELETE_SUBCATEGORY_FINISHED,
    id,
  };
};

const addSubcategory = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.ADD_SUBCATEGORY,
    payload: subcategory,
  };
};

const addSubcategoryFinished = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.ADD_SUBCATEGORY_FINISHED,
    payload: subcategory,
  };
};

const editSubcategory = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.EDIT_SUBCATEGORY,
    payload: subcategory,
  };
};

const editSubcategoryFinished = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.EDIT_SUBCATEGORY_FINISHED,
    payload: subcategory,
  };
};

const setSubcategoryFormValues = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.SET_SUBCATEGORY_FORM,
    payload: subcategory,
  };
};

const setSubcategoryFormValuesFinished = (
  subcategory: Subcategory
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.SET_SUBCATEGORY_FORM_FINISHED,
    payload: subcategory,
  };
};

const setSubcategoryPromptVisibility = (
  isVisible: boolean
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.SET_SUBCATEGORY_PROMPT_VISIBILITY,
    isVisible,
  };
};

const setSubcategoryPromptVisibilityFinished = (
  isVisible: boolean
): subcategoryTypes.SubcategoryActionTypes => {
  return {
    type: subcategoryTypes.SET_SUBCATEGORY_PROMPT_VISIBILITY_FINISHED,
    isVisible,
  };
};

export default {
  deleteSubcategory,
  deleteSubcategoryFinished,
  addSubcategory,
  addSubcategoryFinished,
  editSubcategory,
  editSubcategoryFinished,
  setSubcategoryFormValues,
  setSubcategoryFormValuesFinished,
  setSubcategoryPromptVisibility,
  setSubcategoryPromptVisibilityFinished,
};
