import React, { useState, useEffect } from "react";
import { countries } from "countries-list";
import { Country } from "./Country";
import Select, { ValueType } from "react-select";
import { getUserLocale } from "get-user-locale";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  setLocale: Function;
}

const LocaleSelectorComponent: React.FC<Props> = ({ setLocale }: Props) => {
  const [countriesArr, setCountriesArr] = useState<Country[]>([]);

  const getCountryCode = (): string =>
    getUserLocale()
      .substring(0, 2)
      .toUpperCase();

  const findCountryBasedOnKey = (countryCode: string): Country => {
    const country: Country = countriesArr.filter(
      x => x.key === countryCode
    )?.[0];

    return country;
  };

  const setDefaultLocale = (): void => {
    const country: Country = findCountryBasedOnKey(getCountryCode());

    if (country !== undefined) {
      setLocale({
        key: country.key,
        name: country.name,
        currency: country.currency,
        emojiU: country.emojiU
      });
    }
  };

  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    getCountryCode()
  );

  useEffect(() => {
    const tmpCountryList: Country[] = [];
    Object.entries(countries).forEach(([key, value]) =>
      tmpCountryList.push({ ...value, key: key })
    );

    setCountriesArr(tmpCountryList);

    setCountriesOptions(
      tmpCountryList.map(country => {
        return {
          value: country.key,
          label: country.name
        };
      })
    );

    setDefaultLocale();
  }, []);

  const onCountryChange = (
    selection?: ValueType<SelectOption> | null | undefined
  ): void => {
    const countryCode = (selection as SelectOption)?.value;
    setSelectedCountryCode(countryCode);

    const country: Country = findCountryBasedOnKey(countryCode);

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
        />
      </div>
    </div>
  );
};

export default LocaleSelectorComponent;
