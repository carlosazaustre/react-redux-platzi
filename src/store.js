import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger()),
);

export default store;
