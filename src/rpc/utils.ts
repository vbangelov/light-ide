import { RpcBrowserWebSockets } from "./rpc-browser-ws";

async function setupWsRPC(context: any, port: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      const ws = new window.WebSocket(`ws://127.0.0.1:${port}`);

      ws.onopen = () => {
        try {
          context.rpc = new RpcBrowserWebSockets(ws);
          console.log("WebSocket connection established");
          resolve();
        } catch (err) {
          console.error("RPC initialization failed:", err);
          reject(err);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        resolve(); // TODO: Reject in future.
      };

      ws.onclose = () => {
        console.warn("WebSocket connection closed");
      };
    } catch (err) {
      console.error("WebSocket setup threw an error:", err);
      resolve(); // TODO: Reject in future.
    }
  });
}

export async function setupRpc(context: any): Promise<void> {
  await setupWsRPC(context, 10124);
  console.log("setupRpc completed");
}
