import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';
import * as functional from '../src/functional/expressions';
import {RpsContext} from '../src/context';

m.before(() => {
    c.should();
    c.use(chaiAsPromised);
});


m.describe('Functional', () => {
  m.it('Map Item', (done) => {
    let inputs = [1 , 2 , 3 ];
    let double = x => x * 2;

    functional.Map(new RpsContext(), [double,inputs]).then( res => {
      done();
    });
  });

})
