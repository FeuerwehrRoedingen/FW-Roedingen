import { Server as SocketServer } from 'socket.io'
import { IPty, spawn } from 'node-pty'

import { hostname, wsProtocol } from './host'
import type { Server } from '../../prisma/client'

let socketServer: SocketServer | null = null;

export async function create(server: Server, username: string, password: string){

	if(!socketServer)
		socketServer = new SocketServer(4001);
		
	socketServer.on('connection', (socket) => {
		const ptyProcess = spawn('ssh', ['-p', server.sshPort.toString(), `${username}@${server.ip}`], {
			name: 'xterm-color',
			cols: 80,
			rows: 30,
			cwd: process.env.HOME,
			env: process.env
		});

		console.log(`Created ssh session for ${username}@${server.ip}`);
		console.log('pty pid: ', ptyProcess.pid);

		socket.on('disconnect', () => {
			ptyProcess.kill();
		});
		socket.on('error', (error) => {
			console.error(error);
		});

		socket.on('data', (data) => {
			ptyProcess.write(data);
		});

		ptyProcess.onData((data) => {
			socket.write(data);
		});
		ptyProcess.onExit(() => {
			socket.disconnect();
		})

		ptyProcess.write(`${password}\r`);
	});

	const url = `${wsProtocol}://${hostname}:${4001}`;

	return url;
}	
