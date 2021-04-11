import countryReducer from './slice';
import { setCountry } from './slice';
import { Country } from '../../redux/state';

describe('Country reducer', () => {
  const initialIncomeSectionState: Country = {
    name: 'United States',
    currency: 'USD',
    emojiU: 'emoji',
    key: 'USD',
    language: 'pl',
  };

  it('Returns new country when setCountry action is called', () => {
    const newCountry: Country = {
      name: 'Poland',
      currency: 'PLN',
      emojiU: 'emoji+PL',
      key: 'PLN',
      language: 'pl',
    };
    const newState = countryReducer(
      initialIncomeSectionState,
      setCountry(newCountry)
    );

    expect(newState).toEqual<Country>(newCountry);
  });
});
