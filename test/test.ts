import {expect} from 'chai';
import test from '../src/test/expressions';
import {RpsContext} from '../src/context';

import {TestUtils} from '../src/test/utils';

let $CONTEXT,$RESULT;

beforeEach(() => {
  $CONTEXT = new RpsContext();
})


describe.skip('Test', () => {

  it('parse BDD chain', () => {
    let util = new TestUtils;
    util.parseChaiExpect(11,11,"to","not","be","true");
  });

  it.skip('should run util test', async function () {
    // let util = new TestUtils;

    // await util.createSuite($CONTEXT,{},"suite 1");
    
    // await util.createTestCase($CONTEXT,{},"tc 1",1,2,"to","not","be","equal");
    // await util.createTestCase($CONTEXT,{},"tc 2",2,2,"to","be","equal");
    // await util.createTestCase($CONTEXT,{},"tc 3",true,null,"to","be","true");
    
    // let result = await util.runTest($CONTEXT,{});
  });

})

// expect "shoule be not working" 1 to be equal 2
