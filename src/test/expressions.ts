/**
 * @module Test
 */

import fs from 'fs';
import Mocha from 'mocha';
import R from 'ramda';
import assert from 'assert';
import {RpsContext} from '../context';


export function _TestSuite (ctx:RpsContext,opts:{}, suitename:string) : Promise<void> {
  // @ts-ignore
  ctx.test.mocha = new Mocha();
  // @ts-ignore
  ctx.test.suite = Mocha.Suite.create(ctx.test['mocha'].suite, suitename);

  return Promise.resolve();
}
let TestSuite = R.curry(_TestSuite);
export {TestSuite};


interface TestCaseOpts {
  type?:string;
}
let TC_DEFAULT = {type:''};
export function _TestCase (ctx:RpsContext, opts:TestCaseOpts,
  testname:string, expect:any, actual?:any) : Promise<void> {
  let options = R.merge(TC_DEFAULT, opts);

  // @ts-ignore
  ctx.test['suite'].addTest(
    new Mocha.Test(testname, function () {
      if(actual) assert.deepStrictEqual(expect, actual);
      else assert(expect);
    })
  );

  return Promise.resolve();
}
let TestCase = R.curryN(4, _TestCase);
export {TestCase};


interface ReportOptions {
  reporter:string;
  overwrite?:boolean;
  showPassed?:boolean;
  title?:string;
  reportFilename?:string;
  reportDir?:string;
  saveJson?:boolean;
  autoOpen?:boolean;
};
let DEFAULT_REPORTER = {reporter:'mochawesome'};
export function _TestReport (ctx:RpsContext, opts:any) : Promise<boolean> {

  return new Promise((resolve,reject) => {

    let options = R.merge(DEFAULT_REPORTER, opts);

    ctx.test.mocha.reporter(options.reporter,{
      reportTitle:options.reportTitle,
      reportFilename:options.reportFilename,
      showPassed:options.showPassed,
      overwrite:options.overwrite,
      autoOpen:options.autoOpen,
      quiet:true
    });

    ctx.test['mocha'].run( () => resolve(true));
  });
}
let TestReport = R.curry(_TestReport);
export {TestReport};
