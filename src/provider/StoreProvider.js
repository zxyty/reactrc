import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import createLoading from "dva-loading";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import dva from "../utils/dva";
import models from "../models";
import config from "../config";

const app = dva({
  initialState: {},
  models: models,
  onReducer(reducer) {
    const persistConfig = {
      key: "root",
      whitelist: config.cacheKeys,
      blacklist: [],
      storage: storage,
      stateReconciler: autoMergeLevel2,
    };
    return persistReducer(persistConfig, reducer);
  },
});

app.use(createLoading());

app.start();

export const store = app.getStore();

persistStore(store, {}, () => {
  // console.log(store.getState());
  // 获取所有本地数据后
});

class AppStoreProvider extends PureComponent {
  getChildContext() {
    return {
      store,
    };
  }

  static childContextTypes = {
    store: PropTypes.shape({}),
  };

  render() {
    const { children } = this.props;

    return <Provider store={store}>{children}</Provider>;
  }
}

export default AppStoreProvider;
