import { RpcCommon } from "./rpc-common.js";
import type { IPromiseCallbacks } from "./rpc-common.js";

export class RpcBrowserWebSockets extends RpcCommon {
  ws: WebSocket;

  constructor(ws: WebSocket) {
    super();
    this.ws = ws;
    this.ws.addEventListener("message", (event) => {
      const message: any = JSON.parse(event.data as string);
      console.debug(`Event Listener: Received event: ${JSON.stringify(message)}`);
      switch (message.command) {
        case "rpc-response":
          this.handleResponse(message);
          break;
        case "rpc-request":
          this.handleRequest(message);
          break;
      }
    });
  }

  sendRequest(id: number, method: string, params?: any[]) {
    // TODO: consider cancelling the timer if the promise if fulfilled before timeout is reached
    setTimeout(() => {
      const promiseCallbacks: IPromiseCallbacks | undefined = this.promiseCallbacks.get(id);
      if (promiseCallbacks) {
        console.warn(`sendRequest: Request ${id} method ${method} has timed out`);
        promiseCallbacks.reject("Request timed out");
        this.promiseCallbacks.delete(id);
      }
    }, this.timeout);

    // TODO: find an alternative to appending vscode to the global scope (perhaps providing vscode as parameter to constructor)
    const requestBody: any = {
      command: "rpc-request",
      id: id,
      method: method,
      params: params,
    };

    this.ws.send(JSON.stringify(requestBody));
  }

  sendResponse(id: number, response: any, success: boolean = true): void {
    const responseBody: any = {
      command: "rpc-response",
      id: id,
      response: response,
      success: success,
    };

    this.ws.send(JSON.stringify(responseBody));
  }
}
