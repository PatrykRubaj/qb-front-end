import Head from 'next/head';
import '../styles/BootstrapCustomization.scss';
import NavigationBar from '../components/common/navigation-bar';
import Footer from '../components/common/footer';
import { Provider } from 'react-redux';
import getStore from '../redux/getStore';

const store = getStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {process.env === 'production' ? (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-176564324-1"
            ></script>
            <script src="/ganalytics.js"></script>
          </>
        ) : null}

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="container-flex">
        <NavigationBar />
        <div className="container">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
      />
    </Provider>
  );
}

export default MyApp;
