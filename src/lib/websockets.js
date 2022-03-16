import {WebSocketServer} from "ws"

export default function initWebSocket() {

    const wss = new WebSocketServer({ noServer : true });

    wss.on("connection", ws => {
        console.log("New client connected!");
        ws.on("message", () => {
            console.log("resived")
        });
        ws.on("close", () => {
            console.log("Client has disconnected!");
        });
    });
return wss;
}
