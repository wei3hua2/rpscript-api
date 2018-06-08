export class TestSuiteModel {

  suitename:string;
  opts?:TestSuiteOptions;

  constructor(args:string[], opts?:TestSuiteOptions){
    this.suitename = args[0];
    this.suitename = this.suitename.replace(/"/g , "");

    this.opts = opts;
  }
}
export class TestSuiteOptions {}

export class TestCaseModel {
  testname:string;
  opts?:TestCaseOptions;

  constructor(args:string[], opts?:TestCaseOptions){
    this.testname = args[0];
    this.testname = this.testname.replace(/"/g , "");
    this.opts = opts;
  }
}
export class TestCaseOptions {}

export class TestReportModel {
  opts?:TestReportOptions;

  constructor(args:string[], opts?:TestReportOptions){
    this.opts = opts;
  }
}
export class TestReportOptions {}
