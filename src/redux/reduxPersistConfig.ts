import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";

const persistConfig = {
  key: "auth",
  storage,
};

export const persistedAuthReducer = persistReducer(persistConfig, authReducer);
