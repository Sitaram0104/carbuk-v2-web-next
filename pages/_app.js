import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import NavBar from "../components/NavBar";
import Image from "next/image";

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
        <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <Image
            src="/car-gray-2.jpg"
            layout="fill"
            objectFit="cover"
            style={{ filter: "blur(2px)" }}
            alt="background-image"
          />
          <NavBar />
          <Component {...pageProps} />
        </main>
      </SnackbarProvider>
    </Provider>
  );
}

export default MyApp;
