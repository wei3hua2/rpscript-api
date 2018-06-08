import {TestContext} from './test/model/context';
import {ChromeContext} from './chrome/model/context';

export class RpsContext {
  test:TestContext;
  chrome:ChromeContext;
  constructor(){
    this.test = new TestContext();
    this.chrome = new ChromeContext();
  }
}
