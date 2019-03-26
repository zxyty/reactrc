import { create } from "dva-core";
import { createHashHistory } from "history";
import * as routerRedux from "react-router-redux";

const { routerMiddleware, routerReducer: routing } = routerRedux;

export default function(options) {
  const history = options.history || createHashHistory();

  // https://github.com/dvajs/dva/blob/master/packages/dva/src/index.js
  const createOpts = {
    initialReducer: {
      routing,
    },
    setupMiddlewares(middlewares) {
      return [routerMiddleware(history), ...middlewares];
    },
    setupApp(app) {
      app._history = patchHistory(history);
    },
  };

  const app = create(options, createOpts);
  // HMR workaround
  if (!global.registered) {
    options.models.forEach(model => app.model(model));
  }
  global.registered = true;
  app.getStore = () => app._store;

  return app;
}

function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = callback => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
}
