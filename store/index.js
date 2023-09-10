import configureStore from "./CreateStore";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    rootReducer,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./reducers").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("./sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
