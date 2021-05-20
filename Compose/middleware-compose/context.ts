/*
 context构造
 */
import { Requeset, Response } from './interface';

export default class Context {
  req: Requeset = {
    api: '',
    param: {},
  };

  res: Response = {
    response: '',
  };

  status: boolean = true; // 全局状态，用于框架层判断是否 resolve 还是 reject

  constructor(Req: Requeset) {
    this.req = Req;
  }
}
