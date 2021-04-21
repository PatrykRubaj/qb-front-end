import { getUserLocale } from "get-user-locale";
import { countries } from "countries-list";
import { Country } from "../redux/state";

export const countriesList = (): Country[] => {
  const tmpCountryList: Country[] = [];
  Object.entries(countries).forEach(([key, value]) => {
    if (value.currency && value.currency.length > 0) {
      tmpCountryList.push({
        ...value,
        key: key,
        currency: value.currency.split(/,/)[0],
        language: value.languages[0],
        name: `${value.currency.split(/,/)[0]} - ${value.name}`,
      });
    }
  });
  return tmpCountryList;
};

export const findCountryBasedOnKey = (countryCode: string): Country | null => {
  return countriesList().find((x) => x.key === countryCode) || null;
};

export const getUsersCountry = (): Country => {
  const tmpCode = getUserLocale().substring(0, 2).toUpperCase();
  return (
    findCountryBasedOnKey(tmpCode) || {
      name: "United States",
      currency: "USD",
      emojiU: "",
      key: "US",
      language: "en",
    }
  );
};
