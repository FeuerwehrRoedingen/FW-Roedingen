import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { rootReducer } from "./reducer"

let store: ReturnType<typeof initializeStore>

export const initializeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
