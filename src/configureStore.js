import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import watcherCryptocurrencyList from './containers/CurrencyList/saga';
import watcherCurrency from './containers/CurrencyConvert/saga';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(watcherCryptocurrencyList);
  sagaMiddleware.run(watcherCurrency);

  return store;
}
