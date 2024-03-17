import { configureStore } from "@reduxjs/toolkit"
import { EqualityFn, useDispatch, useSelector } from "react-redux"
import { UseSelectorOptions } from "react-redux/es/hooks/useSelector"

import rootReducer from "./reducer"

export const store = configureStore({
  reducer: rootReducer,
})

interface UseAppSelector {
  <Selected = unknown>(selector: (state: RootState) => Selected, equalityFn?: EqualityFn<Selected>): Selected;
  <Selected = unknown>(selector: (state: RootState) => Selected, options?: UseSelectorOptions<Selected>): Selected;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: UseAppSelector = useSelector;