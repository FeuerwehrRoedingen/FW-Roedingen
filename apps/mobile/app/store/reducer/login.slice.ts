import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginState = {

};
const initialState: LoginState = {

};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

  },
});

export const {} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
