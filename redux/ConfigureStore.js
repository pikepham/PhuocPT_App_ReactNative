import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { leaders } from './leaders';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ leaders, dishes, comments, promotions, favorites }),
    applyMiddleware(thunk, logger)
  );
  return store;
};