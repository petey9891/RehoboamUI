"use strict";

var _express = _interopRequireDefault(require("express"));

var _bunyan = _interopRequireDefault(require("bunyan"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var app = (0, _express["default"])();
var CONTENT_TYPE = {
  html: 'html',
  css: 'css',
  ico: 'ico',
  js: 'js'
};
var CONTENT_TYPE_HEADER = {
  html: 'text/html',
  css: 'text/css',
  ico: 'image/x-icon',
  js: 'text/javascript'
};
app.get('/*', function (req, res) {
  var url = req.url;
  console.log("pre-url: ".concat(url));

  var ext = _path["default"].extname(url).slice(1);

  console.log("ext: ".concat(ext));

  if (ext === '') {
    ext = 'html';
    url = '/index.html';
  }

  console.log("final-url: ".concat(url));
  console.log("ext: ".concat(ext));
  console.log("dist".concat(url));

  _fs["default"].readFile("dist".concat(url), function (err, data) {
    // eslint-disable-line
    if (err) {
      console.log(err);
      console.log("can't find shit yo");
      console.log(url);
      console.log("dist".concat(url));
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
app.listen(8090, function () {
  return new _bunyan["default"]({
    name: 'Initialize'
  }).info({
    port: 8090
  });
});
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(app, "app", "/Users/andrewpeterson/git/RehoboamUI/app/src/server.js");
  reactHotLoader.register(CONTENT_TYPE, "CONTENT_TYPE", "/Users/andrewpeterson/git/RehoboamUI/app/src/server.js");
  reactHotLoader.register(CONTENT_TYPE_HEADER, "CONTENT_TYPE_HEADER", "/Users/andrewpeterson/git/RehoboamUI/app/src/server.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();