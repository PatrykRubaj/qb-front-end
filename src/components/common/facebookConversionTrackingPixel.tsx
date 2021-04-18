import * as React from 'react';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';

interface StateProps {
  trackingAllowed: boolean;
}

interface OwnProps {
  event: 'InitiateCheckout' | 'StartTrial' | 'Subscribe';
}

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

type Props = StateProps & OwnProps;

function FacebookPixel(props: Props) {
  const fbOptions = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };

  React.useEffect(() => {
    if (props.trackingAllowed) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FACEBOOK_PIXEL_ID, null, fbOptions);
          ReactPixel.track(props.event);
        });
    }
  }, []);

  return null;
}

const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps
): StateProps & OwnProps => {
  return {
    trackingAllowed: state.userSection.cookiesConsent.marketing,
    event: ownProps.event,
  };
};

export default connect(mapStateToProps)(FacebookPixel);
