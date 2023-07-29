import { Socket } from 'socket.io'
import { IPty, spawn } from 'node-pty'

import type { Server } from '../../prisma/client'

export function createSsh(socket: Socket, server: Server) {
	socket.write('SSH connection established\n');
	
}