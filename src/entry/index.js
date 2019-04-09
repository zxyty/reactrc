import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import StoreProvider, { store } from "../provider/StoreProvider";
import PrefixProvider from "../provider/PrefixProvider";
import TranslationProvider from "../provider/TranslationProvider";
import router from "../router/router.js";
import config from "../config";
import "../sentry";
import "../assets/nprogress.css";

ReactDOM.render(
  <StoreProvider>
    <TranslationProvider>
      <PrefixProvider>{router(store)}</PrefixProvider>
    </TranslationProvider>
  </StoreProvider>,
  document.querySelector("#app")
);

if (config.isDev && module.hot) {
  module.hot.accept();
}
