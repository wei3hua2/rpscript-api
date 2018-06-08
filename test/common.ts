import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';
import * as common from '../src/common/expressions';
import {RpsContext} from '../src/context';

m.before(() => {
    c.should();
    c.use(chaiAsPromised);
});


m.describe.skip('Common', () => {
  m.it('open testopen.txt', (done) => {
    let pathDirectory = "./test/fixture/testopen.txt";
    let timeout = "5";
    let typeText = "helloworld";
    let $CONTEXT = new RpsContext();

    common.Open($CONTEXT,[pathDirectory]).then((result) => {
        c.expect( result ).to.be.true;
        common.Wait($CONTEXT,[timeout]).then(() => {

          common.Type($CONTEXT,[typeText]).then((output) => {
            c.expect(output).to.a('string',typeText);
            done();
          });

        });
    });

  }).timeout(0);

})
