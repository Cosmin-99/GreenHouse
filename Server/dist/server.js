"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ws_1 = __importDefault(require("ws"));
const app = express_1.default();
const port = process.env.PORT || 4000;
const wss = new ws_1.default.Server({ port: 5000 });
app.use(morgan_1.default('tiny'));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
let interval;
let number = 0;
wss.on("connection", ws => {
    if (interval) {
        clearInterval(interval);
    }
    // ws.send("Welcome New Client !!!");
    interval = setInterval(() => {
        // ws.send("Whatever");
        ws.send(`Message nr ${number++}`);
    }, 2000);
    ws.on("close", () => {
        clearInterval(interval);
    });
    // ws.on('message', data => {
    //     wss.clients.forEach(client => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(data);
    //         }
    //     });
    // });
});
app.listen(port, () => {
    console.log(`Server running on port: ${chalk_1.default.green(port)}`);
});
