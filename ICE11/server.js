"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const hostname = '127.0.0.1';
const port = process.env.PORT || 3010;
let lookup = mime_types_1.default.lookup;
const server = http_1.default.createServer((req, res) => {
    let path = req.url;
    if (path == "/" || path == "/home") {
        path = "/index.html";
    }
    let mimeType = lookup(path.substring(1));
    fs_1.default.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("ERROR 404 - File not Found!" + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {
            "Content-Type": mimeType
        });
        res.end(data);
    });
});
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map