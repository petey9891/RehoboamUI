import fs from 'fs';

/* eslint-disable security/detect-non-literal-fs-filename */
export default () => {
	let selectedEnvironment;
	switch (process.env.NODE_APP_INSTANCE) {
		case 'local':
			selectedEnvironment = {
				port: 8091,
				socketConfig: {
					host: 'www.rehoboamcube.com',
					port: 60000,
					cert: fs.readFileSync(`${process.cwd()}/../../crypto/rehoboam/dev/client.pem`),
					key: fs.readFileSync(`${process.cwd()}/../../crypto/rehoboam/dev/client.key`),
					ca: fs.readFileSync(`${process.cwd()}/../../crypto/rehoboam/dev/ca.pem`)
				}
			};
			break;
		case 'prod':
			selectedEnvironment = {
				port: 8091,
				socketConfig: {
					host: 'www.rehoboamcube.com',
					port: 60000,
					cert: fs.readFileSync(`${process.cwd()}/crypto/client.pem`),
					key: fs.readFileSync(`${process.cwd()}/crypto/client.key`),
					ca: fs.readFileSync(`${process.cwd()}/crypto/ca.pem`)
				}
			};
			break;
		default:
			throw Error('Environment not provided');
	}
	return selectedEnvironment;
};
