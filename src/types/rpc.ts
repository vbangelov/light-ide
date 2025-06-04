export interface RpcMethod {
  name: string;
  func: (...args: any[]) => any;
}
