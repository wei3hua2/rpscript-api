// import * as index from '../src/index';
var index = require('../src/index');

import * as c from 'chai';
import * as m from 'mocha';

m.describe('Index', () => {
  m.it('verify index', () => {

    console.log(index);

    c.expect( true ).to.be.true;
  });

})
