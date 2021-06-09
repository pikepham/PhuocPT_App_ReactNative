import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// redux-persist
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
const config = { key: "root", storage: AsyncStorage, debug: true };

import { dishes } from "./dishes";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { favorites } from "./favorites";
import { leaders } from "./leaders";

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      leaders,
      dishes,
      comments,
      promotions,
      favorites,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
