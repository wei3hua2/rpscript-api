import * as c from 'chai';
import * as m from 'mocha';
import * as common from '../src/common/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT;

m.beforeEach(() => {
  $CONTEXT = new RpsContext();
})

m.describe.skip('Common', () => {
  m.it('open testopen.txt', async function() {
    let pathDirectory = "./test/fixture/testopen.txt", period = 1;

    let open = common.Open($CONTEXT,{});
    let wait = common.Wait($CONTEXT,{});

    let $RESULT = await open(pathDirectory);
    $RESULT = await wait(period);
  });

})
