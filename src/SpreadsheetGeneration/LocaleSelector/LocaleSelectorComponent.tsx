import React, { useState, useEffect } from "react";
import { Country } from "./Country";
import Select, { ValueType } from "react-select";
import {
  getUsersCountry,
  countriesList,
  findCountryBasedOnKey
} from "../../Helpers/LocaleHelper";
interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  setLocale: Function;
}

const LocaleSelectorComponent: React.FC<Props> = ({ setLocale }: Props) => {
  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectOption>({
    value: "",
    label: ""
  });

  useEffect(() => {
    const setDefaultLocale = (): void => {
      const country: Country = getUsersCountry();
      setSelectedCountry({ value: country.key, label: country.name });

      if (country !== undefined) {
        setLocale({
          key: country.key,
          name: country.name,
          currency: country.currency,
          emojiU: country.emojiU
        });
      }
    };

    const tmpCountriesList = countriesList();

    if (tmpCountriesList.length > 0) {
      setCountriesOptions(
        tmpCountriesList.map(country => {
          return {
            value: country.key,
            label: country.name
          };
        })
      );

      setDefaultLocale();
    }
    // eslint-disable-next-line
  }, []);

  const onCountryChange = (
    selection?: ValueType<SelectOption> | null | undefined
  ): void => {
    const countryCode = (selection as SelectOption)?.value;
    const country: Country | null = findCountryBasedOnKey(countryCode);

    setSelectedCountry({
      value: country?.key || "",
      label: country?.name || ""
    });

    if (country !== null) {
      setLocale({
        key: country.key,
        name: country.name,
        currency: country.currency,
        emojiU: country.emojiU
      });
    }
  };

  //Stworzyc mape https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
  //get user locale https://www.npmjs.com/package/get-user-locale
  //React select https://react-select.com/home
  return (
    <div className="row">
      <div className="col">
        <h2>Localization</h2>
        <Select
          options={countriesOptions}
          onChange={(value): void => onCountryChange(value)}
          value={selectedCountry}
        />
      </div>
    </div>
  );
};

export default LocaleSelectorComponent;
