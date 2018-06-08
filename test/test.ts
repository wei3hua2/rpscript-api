import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';
import * as test from '../src/test/expressions';
import {RpsContext} from '../src/context';

m.before(() => {
    c.should();
    c.use(chaiAsPromised);
});


m.describe.skip('Test', () => {
  m.it('add test suite', (done) => {

    let $CONTEXT = new RpsContext();

    test.TestSuite($CONTEXT,["suitename1"]).then((res)=>{
      c.expect($CONTEXT.test['mocha']).to.exist;
      c.expect($CONTEXT.test['suite']).to.exist;

      test.TestCase($CONTEXT,["case 1"]).then((res) => {
        test.Report($CONTEXT,[]);
      });
    });

  }).timeout(0);

})
