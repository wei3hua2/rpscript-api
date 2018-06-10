import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';
import * as functional from '../src/functional/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT;
let inputs, double, isEven;

m.beforeEach(() => {
    $CONTEXT = new RpsContext();
    inputs = [1,2,3,4];
    double = x => x*2;
    isEven = n => n % 2 === 0;
});


m.describe('Functional', () => {
  m.it('should map item', async function() {
    let mapFn = await functional.Map($CONTEXT,{},double);
    let result = mapFn(inputs);

    c.expect(result).to.have.same.members([2,4,6,8]);
  });

  m.it('should filter item', async function() {
    let filterFn = await functional.Filter($CONTEXT,{},isEven);
    let result = filterFn(inputs);

    c.expect(result).to.have.same.members([2,4]);
  });

})
