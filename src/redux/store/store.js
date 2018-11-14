/* @flow */
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";
// import hardSet from "redux-persist/lib/stateReconciler/";

import config from "../../config";
import thunkMiddleware from "redux-thunk";
import { logger, router, reduxRouterMiddleware } from "../../middleware";
import rootReducer from "../reducer";

const enhancer = compose(
  // autoRehydrate(),
  applyMiddleware(...[reduxRouterMiddleware, thunkMiddleware, logger, router].filter(c => {
    return c != null;
  }))
);

const nextReducer = require("../reducer");

const persistConfig = {
  key: "root",
  storage,
  whitelist: [...config.storeKeys, ...config.cacheKeys],
  blacklist: [],
  // stateReconciler: hardSet
};

export default function configure(initialState = {}) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store = create(persistedReducer, {}, enhancer);

  if (!config.isDev && module.hot) {
    module.hot.accept("../reducer", () => {
      store.replaceReducer(persistReducer(persistConfig, nextReducer));
    });
  }

  let persistor = persistStore(store, {}, () => {

  });

  return { store, persistor };
}
