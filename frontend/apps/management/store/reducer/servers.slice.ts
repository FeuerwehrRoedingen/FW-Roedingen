import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Server } from '@/utils/Server'

type IUpdateParams = {
  id: number;
  server: Partial<Omit<Server, 'id'>>;
}
const updateServer = createAsyncThunk<Server, IUpdateParams>(
  'servers/updateServer',
  async ({id, server}: IUpdateParams) => {
    const response = await fetch(`/api/v1/servers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(server),
    });

    if(!response.ok) {
      return Promise.reject(response.statusText);
    }

    const updatedServer = await response.json();
    return updatedServer;
  }
);

const refreshServers = createAsyncThunk(
  'servers/refreshServers',
  async () => {
    const response = await fetch('/api/v1/servers');

    if(!response.ok) {
      return Promise.reject(response.statusText);
    }

    const servers = await response.json();
    return servers;
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(updateServer.fulfilled, (state, action) => {
      const id = state.servers.findIndex((server) => server.id === action.payload?.id);

      if (id === -1) {
        return;
      }

      state.servers[id] = action.payload;
    });
    builder.addCase(refreshServers.fulfilled, (state, action) => {
      state.servers = action.payload;
    });
  }
});


export { updateServer, refreshServers };
export const { setServers, setSelectedServer } = serversSlice.actions;
export const serversReducer = serversSlice.reducer;
