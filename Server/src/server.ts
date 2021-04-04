import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import WebSocket from 'ws';

const app = express();
const port = process.env.PORT || 4000;
const wss = new WebSocket.Server({ port: 5000 });

app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


let interval: NodeJS.Timeout;
let number = 0;
wss.on("connection", ws => {
    if (interval) {
        clearInterval(interval);
    }
    // ws.send("Welcome New Client !!!");

    interval = setInterval(() => {
        // ws.send("Whatever");
        ws.send(`Message nr ${number++}`)
        
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
})

app.listen(port, () => {
    console.log(`Server running on port: ${chalk.green(port)}`);
});

