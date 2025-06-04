import { RpcBrowserWebSockets } from "./rpc-browser-ws";

async function setupWsRPC(context: any, port: number): Promise<unknown> {
  const ws = new window.WebSocket(`ws://127.0.0.1:${port}`);
  return new Promise<void>((resolve, reject) => {
    ws.onopen = async (): Promise<any> => {
      try {
        context.rpc = new RpcBrowserWebSockets(ws);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
  });
}

/**
 * Initializes RPC opject from frontend side. Make the RPC object global and available to all components in app.
 */
export async function setupRpc(context: any): Promise<void> {
  await setupWsRPC(context, 10124);
}
