import * as c from 'chai';
import * as m from 'mocha';
import * as desktop from '../src/desktop/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT;

m.beforeEach(() => {
  $CONTEXT = new RpsContext();
})

m.describe.skip('Desktop', () => {
  m.it('get desktop info', async function() {
    let info = await desktop.Info($CONTEXT,{});
    c.expect(info).to.exist;
  });

  m.it('mouse move', async function() {
    let mouse = await desktop.Mouse($CONTEXT,{click:true});
    let output = mouse(10,10);

    console.log('output : '+output);

    // c.expect(info).to.exist;
  });

})
