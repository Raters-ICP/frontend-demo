import "../styles/globals.css";
import "../app/main.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/grid";

import { wrapper } from "../app/store";
import { appWithTranslation } from "next-i18next";
import { StylesProvider } from "@material-ui/core";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Montserrat, Open_Sans } from "@next/font/google";
import { AppInit } from "../app/components/AppInit";
import { AppLayout } from "../app/components/AppLayout";
import { Provider } from "react-redux";
import { NFID } from "@nfid/embed";
import { InternetIdentityProvider } from "ic-use-internet-identity";

export const monserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const AppLoading = dynamic(() => import("../app/components/AppLoading"));

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const nfid = NFID.init({
    application: {
      name: "Raters App",
      logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg",
    },
  });

  return (
    <div className={monserrat.className}>
      <AppInit />
      <AppLoading />
      <StylesProvider injectFirst>
        <InternetIdentityProvider>
          <Provider store={store}>
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          </Provider>
        </InternetIdentityProvider>
      </StylesProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
