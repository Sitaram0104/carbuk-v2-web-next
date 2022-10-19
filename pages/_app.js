import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Head>
          <title>Carbuk</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta property="og:image" content="/carbuk_logo.png" key="ogimage" />
          <meta property="og:title" content="CARBUK" key="ogtitle" />
          <meta
            property="og:description"
            content="Use carbuk for booking rides"
            key="ogdesc"
          />
        </Head>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  );
}

export default MyApp;
