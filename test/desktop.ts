import * as c from 'chai';
import * as m from 'mocha';
import * as desktop from '../src/desktop/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT;

beforeEach(() => {
  $CONTEXT = new RpsContext();
})

describe.skip('Desktop', () => {
  it('get desktop info', async function() {
    let info = await desktop.Info($CONTEXT,{});
    c.expect(info).to.exist;
  });

  it('mouse move', async function() {
    let mouse = await desktop.Mouse($CONTEXT,{click:true});
    let output = mouse(10,10);

    console.log('output : '+output);

    // c.expect(info).to.exist;
  });

})
