/**
 * @module Test
 */

import fs from 'fs';
import c from 'chai';
import Mocha from 'mocha';

import {TestSuiteModel, TestCaseModel, TestReportModel} from './model/model';
import {RpsContext} from '../context';


export function TestSuite (ctx:RpsContext,arg:string[],opts?:any) : Promise<boolean> {
  let model = new TestSuiteModel(arg,opts);

  // @ts-ignore
  ctx.test['mocha'] = new Mocha({reporter: 'spec'});
  // @ts-ignore
  ctx.test['suite'] = Mocha.Suite.create(ctx.test['mocha'].suite, model.suitename);

  return Promise.resolve(true);
}

export function TestCase (ctx:RpsContext,arg:string[],opts?:any) : Promise<boolean> {
  let model = new TestCaseModel(arg,opts);

  // @ts-ignore
  ctx.test['suite'].addTest(new Mocha.Test(model.testname, function () {
    c.expect(1).to.equal(1);
  }));

  return Promise.resolve(true);
}

export function Report (ctx:RpsContext,arg:string[],opts?:any) : Promise<boolean> {
  let report = new TestReportModel(arg,opts);

  let runner = ctx.test['mocha'].run();

  return Promise.resolve(true);
}
