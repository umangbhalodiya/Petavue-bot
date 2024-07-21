import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import botSlice from "./ApiSlice/botSlice";

const reducers = combineReducers({
  bot: botSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bot"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const isProd = window?.location?.href?.includes("https");

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isProd ? false : true,
});

export const persistor = persistStore(store);
export default store;
