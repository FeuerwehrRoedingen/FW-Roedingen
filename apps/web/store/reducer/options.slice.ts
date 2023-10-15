import { createSlice } from '@reduxjs/toolkit'

type OptionsState = {
  showFPS: boolean;
  limitFPS: boolean;
  fpsLimit: number;
}

const initialState: OptionsState = {
  showFPS: true,
  limitFPS: true,
  fpsLimit: 60,
}

const OptionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleShowFPS: (state) => {
      state.showFPS = !state.showFPS
    },
  },
})

export const optionsReducer = OptionsSlice.reducer
export const { toggleShowFPS } = OptionsSlice.actions
