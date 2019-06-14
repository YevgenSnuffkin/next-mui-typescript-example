"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var app = next_1.default({ dev: dev });
var handler = app.getRequestHandler();
app.prepare().then(function () {
    var server = express_1.default();
    server.get('/uzytkownik/:id', function (req, res) {
        return app.render(req, res, '/user', { id: req.params.id });
    });
    server.get('*', function (req, res) {
        return handler(req, res);
    });
    server.listen(port, function (err) {
        if (err) {
            throw err;
        }
        console.log("> Ready on http://localhost:" + port);
    });
});
