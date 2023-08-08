import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Status = {
  cpus: {
    model: String;
    speed: number;
    times: {
      user: number;
      nice: number;
      sys: number;
      idle: number;
      irq: number;
    }
  }[];
  freemem: number;
  hostname: string;
  totalmem: number;
};

type StatusState = Status & {
  cpuUsage: number;
  memoryUsage: number;
};
const initialState: StatusState = {
  cpus: [],
  cpuUsage: 0,
  freemem: 0,
  hostname: '',
  totalmem: 0,
  memoryUsage: 0,
};

const calcUsage = (cpus: any[]) => {
  const usages = cpus.map(({ times }) => {
    const { user, nice, sys, idle, irq } = times;
    const total = user + nice + sys + idle + irq;
    return parseInt(((1 - (idle / total)) * 100).toFixed(2), 10);
  });

  console.log(usages);

  const usage = parseInt((usages.reduce((acc, cur) => acc + cur) / usages.length).toFixed(2), 10);

  return usage;
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<Partial<Status>>) {
      const { cpus, totalmem, freemem } = action.payload;

      if (!cpus) {
        state.cpus = [];
        state.cpuUsage = 0;
      } else {
        state.cpus = cpus;
        state.cpuUsage = calcUsage(cpus);
      }

      state.freemem = freemem || 0;
      state.totalmem = totalmem || 0;
      state.hostname = action.payload.hostname || '';

      if (!totalmem || !freemem) {
        state.memoryUsage = 0;
      } else {
        state.memoryUsage = parseInt(((1 - (freemem / totalmem)) * 100).toFixed(2), 10);
      }
    },
  },
});

export const { updateStatus } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
