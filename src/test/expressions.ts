/**
 * @module Test
 */

import R from 'ramda';
import {RpsContext} from '../context';
import {TestUtils, TestCaseOpts} from './utils';


let testUtil = new TestUtils;


export function _TestSuite (ctx:RpsContext,opts:{}, suitename:string) : Promise<void> {
  return testUtil.createSuite(ctx, {}, suitename);
}
let TestSuite = R.curry(_TestSuite);
export {TestSuite};


export function _TestCase (ctx:RpsContext, opts:TestCaseOpts,
  testname:string, fn) : Promise<void> {
  // return testUtil.createTestCase(ctx,opts,testname,expect,actual,chains);
  return testUtil.createTestCase(ctx,opts,testname,fn);
}
let TestCase = R.curryN(4, _TestCase);
export {TestCase};

export function _Expect (ctx:RpsContext, opts:TestCaseOpts,
  expect:any, actual:any, ...chains:string[]) : Promise<void> {
  
  testUtil.parseChaiExpect(expect,actual,chains);
  
  return Promise.resolve();
}
let Expect = _Expect;
export {Expect};

export function _TestReport (ctx:RpsContext, opts:any) : Promise<boolean> {
  return testUtil.runTest(ctx,opts);
}
let TestReport = R.curry(_TestReport);
export {TestReport};
