import * as React from 'react';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

interface StateProps {
  statisticsTrackingAllowed: boolean;
}

function GoogleAnalytics(props: StateProps) {
  const router = useRouter();

  if (props.statisticsTrackingAllowed) {
    ReactGA.initialize('UA-176564324-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  useEffect(() => {
    if (props.statisticsTrackingAllowed) {
      const handleRouteChange = (url: URL) => {
        /* invoke analytics function only for production */
        ReactGA.pageview(url.toString());
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    statisticsTrackingAllowed: state.userSection.cookiesConsent.statistics,
  };
};

export default connect(mapStateToProps)(GoogleAnalytics);
// export default GoogleAnalytics;
