import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Carbuk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/carbuk_logo.png" key="ogimage" />
        <meta property="og:title" content="CARBUK" key="ogtitle" />
        <meta
          property="og:description"
          content="Use carbuk for booking rides"
          key="ogdesc"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
