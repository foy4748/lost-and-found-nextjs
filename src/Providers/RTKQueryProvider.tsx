"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor, store } from "@/redux/store";
import { AppStore } from "@/redux/store";
import { ReactNode, useRef } from "react";

export default function ReduxToolkitProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
