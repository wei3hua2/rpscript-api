import * as c from 'chai';
import * as m from 'mocha';
import * as test from '../src/test/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT,$RESULT;

m.beforeEach(() => {
  $CONTEXT = new RpsContext();
})


m.describe('Test', () => {
  m.it('add test suite', async function() {
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
      autoOpen:true});

    c.expect($RESULT).to.be.true;
  });

})
