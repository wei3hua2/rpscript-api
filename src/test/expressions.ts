/**
 * @module Test
 */

import {Suite,Test, Runner} from 'mocha';
import {RpsContext} from '../context';
import {TestUtils, TestCaseOpts} from './utils';
import {emitter} from '../decorators';

export default class test {

  static util = new TestUtils;

  @emitter("action","test")
  static async TestSuite (ctx:RpsContext,opts:{}, suitename:string) : Promise<Suite> {

    return test.util.createSuite(ctx, {}, suitename);
  }

  @emitter("action","test")
  static async TestCase (ctx:RpsContext, opts:TestCaseOpts,
    testname:string, fn:()=>void) : Promise<Test> {

    return test.util.createTestCase(ctx,opts,testname,fn);
  }

  @emitter("action","test")
  static async Expect (ctx:RpsContext, opts:TestCaseOpts,
    expect:any, actual:any, ...chains:string[]) : Promise<void> {
    
    test.util.parseChaiExpect(expect,actual,chains);
    
    return Promise.resolve();
  }

  @emitter("action","test")
  static async TestReport (ctx:RpsContext, opts:any) : Promise<Runner> {
    
    return test.util.runTest(ctx,opts);
  }

}
