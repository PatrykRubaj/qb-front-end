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
        {process.env.NODE_ENV === 'production' ? (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-176564324-1"
            ></script>
            <script src="/ganalytics.js"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-T3TW6FS');
                  `,
              }}
            />
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
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-T3TW6FS"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
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
