import * as React from 'react';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

interface StateProps {
  trackingAllowed: boolean;
}

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

function FacebookPixel(props: StateProps) {
  const router = useRouter();
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
          ReactPixel.pageView();

          router.events.on('routeChangeComplete', () => {
            ReactPixel.pageView();
          });
        });
    }
  });

  return null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    trackingAllowed: state.userSection.cookiesConsent.marketing,
  };
};

export default connect(mapStateToProps)(FacebookPixel);
