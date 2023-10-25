import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getCalendars } from "utils/calendar"
import type { Calendar, Event } from 'utils/calendar'

type CalendarState = {
  calendars: Calendar[]
  selectedCalendars: string[]
}

const initialState: CalendarState = {
  calendars: [],
  selectedCalendars: [],
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<string>) {

      if(state.selectedCalendars.includes(action.payload)){
        const filtered = state.selectedCalendars.filter((cal) => cal !== action.payload);
        return {
          ...state,
          selectedCalendars: filtered
        }
      }

      state.selectedCalendars.push(action.payload);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCalendars.fulfilled, (state, action: PayloadAction<Calendar[]>) => {
      state.calendars = action.payload;
      state.selectedCalendars = action.payload.map((cal) => cal.name);
      return state;
    });
  }
});

export const fetchCalendars = createAsyncThunk(
  'calendar/fetchCalendars',
  async () => {
    const calendars = await getCalendars();
    return calendars;
  }
)

export const { setSelected } = calendarSlice.actions;
export default calendarSlice.reducer;
