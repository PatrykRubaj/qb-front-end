import { Country } from "../state";
import * as countryTypes from "../types/countryTypes";

const setCountry = (country: Country): countryTypes.CountryActionTypes => {
  return {
    type: countryTypes.SET_COUNTRY,
    country,
  };
};

const setCountryFinished = (
  country: Country
): countryTypes.CountryActionTypes => {
  return {
    type: countryTypes.SET_COUNTRY_FINISHED,
    country,
  };
};

export default {
  setCountry,
  setCountryFinished,
};
