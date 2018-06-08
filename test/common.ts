import fs from 'fs';

import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';


m.before(() => {
    c.should();
    c.use(chaiAsPromised);
});


m.describe('Common', () => {
  m.xit('launch run', () => {

    c.expect( true ).to.be.true;
  }).timeout(0);

})
