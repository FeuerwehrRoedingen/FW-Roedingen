import { Socket } from 'socket.io'
import { IPty, spawn } from 'node-pty'

import type { Server } from '../../prisma/client'

export function createSsh(socket: Socket, server: Server) {
	socket.write('enter username: ');
	socket.on('username', (username) => {
		connect(username);
	});
	function connect(username: string) {
		const pty: IPty = spawn('ssh', [ '-p', server.sshPort.toString(), username + '@' + server.ip ], {});
		
		pty.onData((data) => {
			process.stdout.write(data);
			socket.write(data);
		});
		pty.onExit((exitCode) => {
			socket.disconnect();
		});
		
		socket.on('message', (data) => {
			pty.write(data);
		});
		
		
		socket.on('disconnect', () => {
			pty.kill();
		});
	}
}
