import { configureStore } from "@reduxjs/toolkit";
//import counterReducer from "./counterSlice";
//import authReducer from "./slices/authSlice";
import productQueryReducer from "./slices/productQuerySlice";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { persistedAuthReducer } from "./reduxPersistConfig";

import { setupListeners } from "@reduxjs/toolkit/query";

import baseApi from "./apiSlices/baseApiSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    //counter: counterReducer,
    auth: persistedAuthReducer,
    productQuery: productQueryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware);
  },
});

export const makeStore = () => {
  return store;
};

setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
