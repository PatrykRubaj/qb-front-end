import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { PriceTier } from '../../../redux/state';
import PricingTier from '../PricingTier';

describe('PricingTier component', () => {
  it('Should display name', () => {
    const handlePaymentClick = () => {};
    const nameOfTier = 'Basic';

    const tree = renderer.create(
      <PricingTier
        name={nameOfTier}
        price={9.99}
        redirectInPropgress={false}
        description="Great to start your jurney with personal finances."
        priceTier={PriceTier.Basic}
        featuresList={['Cool']}
        onClick={handlePaymentClick}
      />
    );

    const header = tree.root.find((x) => x.type === 'h3');
    expect(header.children).toEqual([nameOfTier]);
  });

  it('Should display price in USD', () => {
    const handlePaymentClick = () => {};
    const expectedPrice = 35.83;

    const tree = renderer.create(
      <PricingTier
        name="Basic"
        price={expectedPrice}
        redirectInPropgress={false}
        description="Great to start your jurney with personal finances."
        priceTier={PriceTier.Basic}
        featuresList={['Cool']}
        onClick={handlePaymentClick}
      />
    );

    const spans = tree.root
      .find((x) => x.type === 'div')
      .findByType('div')
      .findAllByType('span');

    expect(spans[0].children).toEqual(['$', `${expectedPrice}`]);
  });

  it('Should display disabled button with text about redirect when redirect in progress', () => {
    const handlePaymentClick = (tier: PriceTier) => {};
    const redirectInPropgress = true;

    const tree = renderer.create(
      <PricingTier
        name="Basic"
        price={9.99}
        redirectInPropgress={redirectInPropgress}
        description="Great to start your jurney with personal finances."
        priceTier={PriceTier.Basic}
        featuresList={['Cool']}
        onClick={handlePaymentClick}
      />
    );

    const button = tree.root.find((x) => x.type === 'button');

    expect(button.children[1]).toEqual('Redirecting to payment');
    expect(button.props['disabled']).toEqual(true);
  });
});
