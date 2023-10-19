import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type FpsState = {
  fps: number;
  deltas: number[];
}

const initialState: FpsState = {
  fps: 0,
  deltas: [],
}

let lastUpdate = Date.now();

const fpsSlice = createSlice({
  name: 'fps',
  initialState,
  reducers: {
    update(state, action: PayloadAction<number>) {

      state.deltas.push(action.payload);
      if (state.deltas.length > 10) {
        state.deltas.shift();
      }

      const now = Date.now();

      if (now - lastUpdate < 1000) {
        return;
      }

      const sum = state.deltas.reduce((a, b) => a + b, 0);
      const avg = sum / state.deltas.length;

      state.fps = Math.round(1 / avg);
      lastUpdate = now;
    },
  },
});

export const { update } = fpsSlice.actions
export const fpsReducer = fpsSlice.reducer;
