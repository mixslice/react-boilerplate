import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import api from 'middleware/api';
import { default as rootReducer } from 'reducers';


export default (history, initialState = {}) => {
  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(
      thunk,
      api,
      routerMiddleware(history)
    ),
    // Required! Enable Redux DevTools with the monitors you chose
    window.devToolsExtension && __DEV__ ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};
