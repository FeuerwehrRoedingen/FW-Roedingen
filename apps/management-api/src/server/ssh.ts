import { Socket } from 'socket.io'
import { IPty, spawn } from 'node-pty'

import type { Server } from '../../prisma/client'
import { logger } from '../Logger';

//TODO implement arrow keys

export function createSsh(socket: Socket, server: Server) {

	let _username: string = '';

	const messageListener = (data: string) => {
		socket.send(data);
		_username += data;
	};
	const backspaceListener = () => {
		_username = _username.slice(0, -1);
		socket.emit('backspace');
	};

	socket.send('enter username: ');
	socket.on('message', messageListener);
	socket.on('backspace', backspaceListener);
	socket.once('enter', () => {
		logger.log(`SSH: ${_username} connected to ${server.name}`)
		attach(_username);
		socket.emit('enter');
	});

	function attach(username: string) {

		socket.off('message', messageListener);
		socket.off('backspace', backspaceListener);

		const pty = spawn('ssh', ['-p', server.sshPort.toString(), username + '@' + server.ip], {});

		pty.onExit((exit) => {
			logger.log('pty exited with code: ' + exit.exitCode);
			socket.send('pty exited with code: ' + exit.exitCode);
			socket.disconnect();
		});
		pty.onData((data) => {
			socket.write(data);
		});

		socket.on('message', (data) => {
			pty.write(data);
		});
		socket.on('backspace', () => {
			pty.write('\b');
		});
		socket.on('enter', () => {
			pty.write('\r');
		});
		socket.on('disconnect', () => {
			logger.log(`SSH: ${_username} disconnected from ${server.name}`)
			pty.kill();
		});
		socket.on('resize', (data) => {
			pty.resize(data.cols, data.rows);
		});
	}
}
