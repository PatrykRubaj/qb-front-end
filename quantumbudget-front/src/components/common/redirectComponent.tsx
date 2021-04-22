import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Route } from '../../redux/state';
import LoaderWheel from '../common/LoaderWheel';

const RedirectComponent = (props: { redirectUrl: Route }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(props.redirectUrl);
  }, []);

  return (
    <>
      <LoaderWheel description="Wait..." title="Redirect" />
    </>
  );
};

export default RedirectComponent;
