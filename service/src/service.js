import express from 'express';
import Logger from 'bunyan';
import socket_io from 'socket.io';
import tls from 'tls';

import appConfig from './config';

const app = express();
const config = appConfig();

// set headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	next();
});

const server = app.listen(config.port, () => new Logger({ name: 'Initialize' }).info({ port: config.port }));

const io = socket_io(server, {
	cors: {
		origin: '*'
	}
});

const generateHeader = (type, size = 0) => {
	const buffer = new Uint8Array(12);
	buffer[0] = type;

	if (size > 0) {
		buffer[4] = size;
	}

	return buffer;
};

const generateBody = (value) => {
	const buffer = new Uint8Array(1);
	buffer[0] = value;
	return buffer;
};

io.on('connection', (client) => {
	const socket = tls.connect(config.socketConfig);

	client.on('command', (data) => {
		if (data.header) {
			const headerBuffer = generateHeader(data.header, data.body ? 1 : 0);

			let bodyBuffer = [];
			if (data.body) {
				bodyBuffer = generateBody(data.body);
			}

			const buffer = new Uint8Array([...headerBuffer, ...bodyBuffer]);
			socket.write(buffer);
		}
	});

	client.on('disconnect', () => {
		socket.end();
	});
});