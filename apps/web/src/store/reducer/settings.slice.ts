import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { get } from 'utils/localStorage'

export interface SettingsState {
  showStats: boolean;
}

const initialState: SettingsState = {
  showStats: get('showStats') ?? false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowStats(state, action: PayloadAction<boolean>) {
      state.showStats = action.payload
    },
  },
})

export const {} = settingsSlice.actions
export default settingsSlice.reducer;