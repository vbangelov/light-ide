import WebSocket from "ws";

export class LightIdeRpcServer {
  private wss: any;
  private clients: Set<any>;
  private clientMap: Map<number, WebSocket>; // Track requesters by ID

  constructor(port: number) {
    this.clients = new Set();
    this.clientMap = new Map();

    this.wss = new WebSocket.Server({ port, host: "0.0.0.0" }, () => {
      console.log("started websocket server");
    });

    this.wss.on("listening", () => {
      console.log(`listening to websocket on port ${port}`);
    });

    this.wss.on("error", (error: any) => {
      console.error(error);
    });

    this.wss.on("connection", (ws: WebSocket, req: any) => {
      const remoteAddress = req.socket.remoteAddress;
      console.log(`new ws connection from: ${remoteAddress}`);
      this.clients.add(ws);

      ws.on("message", (data: any) => {
        const message = JSON.parse(data);

        if (message.command === "rpc-request") {
          // Save who made this request
          this.clientMap.set(message.id, ws);

          // Broadcast to others
          this.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
          });
        }

        if (message.command === "rpc-response") {
          const requester = this.clientMap.get(message.id);
          if (requester && requester.readyState === WebSocket.OPEN) {
            requester.send(data);
            this.clientMap.delete(message.id); // Cleanup
          }
        }
      });

      ws.on("close", () => {
        this.clients.delete(ws);
        // Optional: clean up any remaining mappings
        for (const [id, client] of this.clientMap.entries()) {
          if (client === ws) this.clientMap.delete(id);
        }
      });
    });
  }

  shutdown() {
    this.wss.close();
  }
}

new LightIdeRpcServer(10124);
