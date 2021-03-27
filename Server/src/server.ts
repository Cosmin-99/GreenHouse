import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import WebSocket from 'ws';

const app = express();
const port = process.env.PORT || 4000;
const wss = new WebSocket.Server({port: 5000});

app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

wss.on("connection", ws => {
    ws.send("Welcome New Client !!!");

    setInterval(() =>{
        ws.send("You will recieve this message at every 5 seconds !!!");
    }, 5000)
})

app.listen(port, () => {
    console.log(`Server running on port: ${chalk.green(port)}`);
});
