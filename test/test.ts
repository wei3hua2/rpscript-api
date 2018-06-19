import {expect} from 'chai';
import * as test from '../src/test/expressions';
import {RpsContext} from '../src/context';

import {TestUtils} from '../src/test/utils';

let $CONTEXT,$RESULT;

beforeEach(() => {
  $CONTEXT = new RpsContext();
})


describe('Test', () => {
  xit('add test suite', async function() {
    let TestCase = test.TestCase($CONTEXT,{});

    let $RESULT:any = await test.TestSuite($CONTEXT, {}, "Test Suite");

    $RESULT = await TestCase("is number working", 1);
    $RESULT = await TestCase("is number working", 1 , 1);
    $RESULT = await TestCase("is string working", "string", "string");
    $RESULT = await TestCase("is array working", ["string"], ["string"]);

    $RESULT = await TestCase("is number not working", 0);
    $RESULT = await TestCase("is number not working", 1 , 2);
    $RESULT = await TestCase("is string not working", "stringx", "string");
    $RESULT = await TestCase("is array not working", ["string"], ["string","x"]);

    $RESULT = await test.TestReport($CONTEXT,{
      reporterFilename:'hello',
      reportTitle:'Hello World',
      autoOpen:false});

    expect($RESULT).to.be.true;
  });

  it('parse BDD chain', () => {
    let util = new TestUtils;
    util.parseChaiExpect(11,11,"to","not","be","true");
  });

  it('should run util test', async function () {
    let util = new TestUtils;

    await util.createSuite($CONTEXT,{},"suite 1");
    
    await util.createTestCase($CONTEXT,{},"tc 1",1,2,"to","not","be","equal");
    await util.createTestCase($CONTEXT,{},"tc 2",2,2,"to","be","equal");
    await util.createTestCase($CONTEXT,{},"tc 3",true,null,"to","be","true");
    
    let result = await util.runTest($CONTEXT,{});
  });

})

// expect "shoule be not working" 1 to be equal 2
