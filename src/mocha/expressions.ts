import {FunctionSymbol} from '../../antlr/RpsSymTable';
import {Expression} from '../../core/expression';

import c from 'chai';
import Mocha from 'mocha';

export class AddTestSuiteExpression extends Expression{
  static NAME = "mocha.";
  context:any;
  constructor(engine:any, context:any){
    super();
    this.context = context;
  }
  execute(expr:FunctionSymbol) :Promise<any> {
    let suiteName = expr.argument[0];
    suiteName = suiteName.replace(/"/g , "");
    this.context['suite'] = Mocha.Suite.create(this.context['mocha'].suite, suiteName);

    return new Promise(function(resolve) {
        resolve(true);
    });
  }
}

export class AddTestCaseExpression extends Expression{
  static NAME = "test.";
  context:any;
  constructor(engine:any, context:any){
    super();
    this.context = context;
  }
  execute(expr:FunctionSymbol) :Promise<any> {
    let testName = expr.argument[0];
    testName = testName.replace(/"/g , "");

    this.context['suite'].addTest(new Mocha.Test(testName, function () {
      c.expect(1).to.equal(1);
    }));

    return new Promise(function(resolve) {
        resolve(true);
    });
  }
}

export class RunTestExpression extends Expression{
  static NAME = "report.";
  context:any;
  constructor(engine:any, context:any){
    super();
    this.context = context;
  }
  execute(expr:FunctionSymbol) :Promise<any> {
    let runner = this.context['mocha'].run();
    return new Promise((resolve) => {
        resolve(true);
    });
  }
}
