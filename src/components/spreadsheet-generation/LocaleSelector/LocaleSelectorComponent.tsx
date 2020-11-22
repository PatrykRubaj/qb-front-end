import React, { useState, useEffect } from "react";
import { Country } from "../../../redux/state";
import Select, { ValueType } from "react-select";
import {
  getUsersCountry,
  countriesList,
  findCountryBasedOnKey,
} from "../../../lib/LocaleHelper";
import { RootState } from "../../../redux/reducers";
import { Dispatch } from "redux";
import countryActions from "../../../redux/actions/countryActions";
import { connect } from "react-redux";
import { CountryActionTypes } from "../../../redux/types/countryTypes";
interface SelectOption {
  value: string;
  label: string;
}

interface StateProps {
  country: Country | null;
}

interface DispatchProps {
  setLocale: (country: Country) => CountryActionTypes;
}

type Props = StateProps & DispatchProps;

const LocaleSelectorComponent: React.FC<Props> = ({
  setLocale,
  country,
}: Props) => {
  const [countriesOptions, setCountriesOptions] = useState<SelectOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectOption>({
    value: "",
    label: "",
  });

  useEffect(() => {
    const setDefaultLocale = (): void => {
      const userCountry: Country = getUsersCountry();
      setSelectedCountry({
        value: userCountry.key,
        label: `${userCountry.name}`,
      });

      if (userCountry !== undefined) {
        setLocale({
          key: userCountry.key,
          name: userCountry.name,
          currency: userCountry.currency,
          emojiU: userCountry.emojiU,
          language: userCountry.language,
        });
      }
    };

    const tmpCountriesList = countriesList();

    if (tmpCountriesList.length > 0) {
      setCountriesOptions(
        tmpCountriesList.map((country) => {
          return {
            value: country.key,
            label: `${country.name}`,
          };
        })
      );

      if (country === null) {
        setDefaultLocale();
      } else {
        setSelectedCountry({
          value: country.key,
          label: `${country.name}`,
        });
      }
    }
    // eslint-disable-next-line
  }, [country]);

  const onCountryChange = (
    selection?: ValueType<SelectOption> | null | undefined
  ): void => {
    const countryCode = (selection as SelectOption)?.value;
    const country: Country | null = findCountryBasedOnKey(countryCode);

    setSelectedCountry({
      value: country?.key || "",
      label: (selection as SelectOption)?.label || "",
    });

    if (country !== null) {
      setLocale({
        key: country.key,
        name: country.name,
        currency: country.currency,
        emojiU: country.emojiU,
        language: country.language,
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    country: state.country,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setLocale: (country: Country): CountryActionTypes =>
      dispatch(countryActions.setCountry(country)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleSelectorComponent);