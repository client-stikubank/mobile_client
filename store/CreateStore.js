import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import Config from "config/DebugConfig";
import Reactotron from "config/ReactotronConfig";

// creates the store
export default (rootReducer, rootSaga) => {
  const createSagaMiddleware = require("redux-saga").default;
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;
  if (Config.useReactotron) {
    enhancers.push(Reactotron.createEnhancer());
  }
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
