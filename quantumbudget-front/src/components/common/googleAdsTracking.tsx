import * as React from 'react';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

interface StateProps {
  trackingAllowed: boolean;
}

function GoogleAnalytics(props: StateProps) {
  const router = useRouter();

  if (props.trackingAllowed) {
    const tagManagerArgs = {
      gtmId: TAG_MANAGER_ID,
    };
    TagManager.initialize(tagManagerArgs);
  }

  // useEffect(() => {
  //   if (props.trackingAllowed) {
  //     const handleRouteChange = (url: URL) => {
  //       TagManager.pageview(url.toString());
  //     };
  //     router.events.on('routeChangeComplete', handleRouteChange);
  //     return () => {
  //       router.events.off('routeChangeComplete', handleRouteChange);
  //     };
  //   }
  // }, [router.events]);

  return null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    trackingAllowed: state.userSection.cookiesConsent.marketing,
  };
};

export default connect(mapStateToProps)(GoogleAnalytics);
