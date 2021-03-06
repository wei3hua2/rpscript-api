import Mocha from 'mocha';
import {expect} from 'chai';
import {Suite,Test, Runner} from 'mocha';
import R from 'ramda';
import {RpsContext} from '../context';

export interface TestCaseOpts {
    type?:string;
}
export interface ReportOptions {
    reporter:string;
    overwrite?:boolean;
    showPassed?:boolean;
    title?:string;
    reportFilename?:string;
    reportDir?:string;
    saveJson?:boolean;
    autoOpen?:boolean;
  }

export class TestUtils {

  createSuite(ctx:RpsContext,opts:{}, suitename:string) :Promise<Suite>{
      // @ts-ignore
      ctx.test.mocha = new Mocha();
      // @ts-ignore
      ctx.test.suite = Suite.create(ctx.test.mocha.suite, suitename);
      ctx.test.suite['enableTimeouts'](false);

      return Promise.resolve(ctx.test.suite);
  }

  TC_DEFAULT = {type:''};


  async createTestCase (ctx:RpsContext, opts:TestCaseOpts, testname:string, 
    fn:()=>void) : Promise<Test> {
    
    let options = R.merge(this.TC_DEFAULT, opts);

    if(!ctx.test.mocha) await this.createSuite(ctx,{},'');
  
    let t = new Test(testname,fn);
    // @ts-ignore
    ctx.test.suite.addTest(t);
  
    return Promise.resolve(t);
  }

   parseChaiExpect (
      expected:any, actual?:any, ...chains:any[]) {
        
    chains = R.flatten(chains);

    let res = expect(expected);
    let lastChain = chains.pop();
    
    chains.forEach(chain => res = res[chain]);

    if(actual) return res[lastChain](actual);
    else return res[lastChain];
  }

  
//   DEFAULT_REPORTER = {reporter:'src/test/my-reporter.js'};
  DEFAULT_REPORTER = {reporter:'mochawesome'};

  runTest (ctx:RpsContext, opts:any) : Promise<Runner> {
  
    return new Promise((resolve,reject) => {
  
      let options = R.merge(this.DEFAULT_REPORTER, opts);
  
      ctx.test.mocha.reporter(options.reporter,{
        reportTitle:options.reportTitle,
        reportFilename:options.reportFilename,
        showPassed:options.showPassed,
        overwrite:options.overwrite,
        autoOpen:options.autoOpen,
        quiet:true
      });
    
      ctx.test.runner = ctx.test.mocha.run( () => resolve(ctx.test.runner));
      
    });
  }
}