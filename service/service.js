import express from 'express';
import Logger from 'bunyan';
import socket_io from 'socket.io';
import fs from 'fs';
import tls from 'tls';

const app = express();

// set headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	next();
});

const server = app.listen(8081, () => new Logger({ name: 'Initialize' }).info({ port: 8081 }));

const io = socket_io(server, {
	cors: {
		origin: '*'
	}
});

const COMMANDS = {
	Ping: 1,
	Shutdown: 2,
	OnOff: 3,
	Brightness: 4,
	Pulse: 5,
	Rehoboam: 6
};

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

// only for now... TODO: get rid of this
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const options = {
	host: 'www.rehoboamcube.com',
	port: 60000,
	cert: fs.readFileSync('server.pem'),
	key: fs.readFileSync('server-key.pem')
};

io.on('connection', (client) => {
	const socket = tls.connect(options, () => {
		console.log('yooooo');

		const headerBuffer = generateHeader(COMMANDS.OnOff);
		const bodyBuffer = generateBody(50);

		const buffer = new Uint8Array([...headerBuffer, ...bodyBuffer]);

		console.log('sending data to client...\n');
		socket.write(buffer);
	});

	client.on('disconnect', () => {
		console.log('buh bye');
	});
});
