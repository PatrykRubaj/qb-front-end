import countryReducer from "./countryReducer";
import { Country } from "../../SpreadsheetGeneration/state";
import actions from "../actions/countryActions";

describe("Country reducer", () => {
  const initialIncomeSectionState: Country = {
    name: "United States",
    currency: "USD",
    emojiU: "emoji",
    key: "USD",
  };

  it("Returns new country when setCountryFinished action is called", () => {
    const newCountry: Country = {
      name: "Poland",
      currency: "PLN",
      emojiU: "emoji+PL",
      key: "PLN",
    };
    const newState = countryReducer(
      initialIncomeSectionState,
      actions.setCountryFinished(newCountry)
    );

    expect(newState).toEqual<Country>(newCountry);
  });
});
