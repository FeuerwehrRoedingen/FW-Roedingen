import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type FpsState = {
  fps: number
}

const initialState = {
  fps: 0,
}

const fpsSlice = createSlice({
  name: 'fps',
  initialState,
  reducers: {
    update(state, action: PayloadAction<number>) {
      const delta = action.payload;
      state.fps = Math.round(1 / delta);
    },
  },
});

export const { update } = fpsSlice.actions
export const fpsReducer = fpsSlice.reducer;
