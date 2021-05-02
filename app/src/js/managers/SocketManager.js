import { io } from 'socket.io-client';

const COMMANDS = {
	Ping: 1,
	Shutdown: 2,
	OnOff: 3,
	Brightness: 4,
	Pulse: 5,
	Rehoboam: 6
};

class SocketManager {
	static manager = new SocketManager();

	constructor() {
		this.socket = null;
	}

	initialize() {
		this.socket = io('wss://www.rehoboamcube.com/api');
	}

	end() {
		this.socket.disconnect();
	}

	shutdown() {
		this.socket.emit('command', { header: COMMANDS.Shutdown });
	}

	toggleDisplay() {
		this.socket.emit('command', { header: COMMANDS.OnOff });
	}

	setBrightness(value) {
		this.socket.emit('command', { header: COMMANDS.Brightness, body: value });
	}

	setMode(value) {
		let mode;
		if (value === 'colorpulse') {
			mode = COMMANDS.Pulse;
		} else {
			mode = COMMANDS.Rehoboam;
		}

		this.socket.emit('command', { header: mode });
	}
}

export default SocketManager;
