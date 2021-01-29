import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import fetchPostsWatcher from './sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, loggerMiddleware),
  );

  sagaMiddleware.run(fetchPostsWatcher);
  return store;
}