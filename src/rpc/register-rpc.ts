import type { RpcMethod } from "src/types/rpc";

export function registerRpcMethods(methods: RpcMethod[]) {
  for (const method of methods) {
    window.rpc?.registerMethod(method);
  }
}
