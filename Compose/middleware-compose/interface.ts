import Context from './context';

export type NextFunction = (ctx: Context, next: NextFunction) => Promise<any>;

export interface MiddleWares {
  name: string;
  action: NextFunction;
}

export interface Requeset {
  api?: string; // 面向用户的接口
  param: Record<string, any>;
  adaptor?: string; // 核心请求对应的名称
  gateway?: string; // 面向用户端的网关
  method?: string; // 请求类型 get/post
  timeout?: number; // 超时时间,透传到底层核心库
  header?: Record<string, any>;
  env?: ''; // 环境参数，核心请求库根据这个参数拼接最终请求地址
  [key: string]: any; // 其他自定义参数, 要注意避免重复
}

export interface Response {
  errorType?: ''; // 可枚举（限流|Session失效|超时）
  errorCode?: '';
  errorMessage?: ''; // 对应errorCode的错位信息描述
  response: any; // 未经处理原始数据
  request?: {}; // 请求参数
}
