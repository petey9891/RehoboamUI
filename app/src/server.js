import express from 'express';
import Logger from 'bunyan';
import fs from 'fs';
import path from 'path';

const app = express();

const CONTENT_TYPE = {
	html: 'html',
	css: 'css',
	ico: 'ico',
	js: 'js'
};

const CONTENT_TYPE_HEADER = {
	html: 'text/html',
	css: 'text/css',
	ico: 'image/x-icon',
	js: 'text/javascript'
};

app.get('/*', (req, res) => {
	let { url } = req;
	let ext = path.extname(url).slice(1);

	if (ext === '') {
		ext = 'html';
		url = '/index.html';
	}

    fs.readFile(`dist${url}`, (err, data) => {	// eslint-disable-line
		if (err) {
			console.log(`can't find shit yo`);
			console.log(url);
			console.log(`${process.cwd()}/dist${url}`);
			res.writeHead(404);
			res.end("can't find shit yo");
		} else {
			switch (ext) {
				case CONTENT_TYPE.html:
					res.setHeader('Content-Type', CONTENT_TYPE_HEADER.html);
					break;
				case CONTENT_TYPE.css:
					res.setHeader('Content-Type', CONTENT_TYPE_HEADER.css);
					break;
				case CONTENT_TYPE.ico:
					res.setHeader('Content-Type', CONTENT_TYPE_HEADER.ico);
					break;
				case CONTENT_TYPE.js:
					res.setHeader('Content-Type', CONTENT_TYPE_HEADER.js);
					break;
				default:
					res.writeHead(400);
					res.end();
					return;
			}
			res.send(data);
		}
	});
});

app.listen(8090, () => new Logger({ name: 'Initialize' }).info({ port: 8090 }));
