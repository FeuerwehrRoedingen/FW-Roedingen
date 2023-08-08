import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LogsState = {
  logs: string[];
}

const initialState: LogsState = {
  logs: [],
}

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs(state, action: PayloadAction<string[]>) {
      state.logs = action.payload;
    },
    addLogs(state, action: PayloadAction<string>) {
      state.logs.push(action.payload);
    }
  }
});

export const { setLogs, addLogs } = logsSlice.actions;
export const logsReducer = logsSlice.reducer;
