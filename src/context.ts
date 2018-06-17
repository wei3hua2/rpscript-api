import {TestContext} from './test/model/context';
import {ChromeContext} from './chrome/model/context';
import { EventEmitter } from 'events';

export class RpsContext {
  test:TestContext;
  chrome:ChromeContext;
  event:EventEmitter;

  constructor(){
    this.test = new TestContext();
    this.chrome = new ChromeContext();
    this.event = new EventEmitter();
  }
}
