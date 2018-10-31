import "babel-polyfill";
import { polyfill } from "es6-promise";
polyfill();
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import TranslationProvider from "../provider/TranslationProvider"; // 国际化配置
import route from "../router/router.js"; // 路由配置
import { PersistGate } from "redux-persist/integration/react"; // 缓存配置
import configure from "../redux/store/store.js"; // store配置
import '../sentry';

import "../flex/mobile";

let storeConfig = configure();

ReactDOM.render(
  <Provider store={storeConfig.store}>
    <TranslationProvider>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        {route(storeConfig.store)}
      </PersistGate>
    </TranslationProvider>
  </Provider>,
  document.querySelector("#app")
);
