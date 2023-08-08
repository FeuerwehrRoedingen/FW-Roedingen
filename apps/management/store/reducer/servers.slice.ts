import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Server } from '@/utils/Server'

type ServerState = {
  servers: Server[];
  selectedServerID: number | null;
};

const initialState: ServerState = {
  servers: [],
  selectedServerID: null,
};

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServers(state, action: PayloadAction<Server[]>) {
      state.servers = action.payload;
    },
    setSelectedServer(state, action: PayloadAction<Server|undefined>) {
      if (!action.payload) {
        state.selectedServerID = null;
        return;
      }
      const id = state.servers.findIndex((server) => server.id === action.payload?.id);

      state.selectedServerID = id === -1 ? null : id;
    }
  }
});

export const { setServers, setSelectedServer } = serversSlice.actions;
export const serversReducer = serversSlice.reducer;
