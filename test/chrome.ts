import * as c from 'chai';
import {RpsContext} from '../src/context';
import * as chrome from '../src/chrome/expressions';
import * as common from '../src/common/expressions';


describe('Chrome', () => {

  xit('should nav to google and popup', async () => {
    let $CONTEXT = new RpsContext();

    let $RESULT = await chrome.Open($CONTEXT,{},"https://www.google.com.sg");

    $RESULT = await common.Once($CONTEXT,{},$RESULT,'load');

    $RESULT = await chrome.Eval($CONTEXT,{},`alert('page loaded');`);

    // $RESULT = await common.Notify($CONTEXT,{},"Loaded",JSON.stringify($RESULT));

    c.expect(true).to.be.true;
  }).timeout(0);

  it('should nav to google, type lebron, click search', async () => {
    let $CONTEXT = new RpsContext();

    let $RESULT = await chrome.Open($CONTEXT,{},"https://www.google.com.sg");

    $RESULT = await common.Once($CONTEXT,{},$RESULT,'load');

    $RESULT = await chrome.Type($CONTEXT,{},'#lst-ib', 'Lebron James');
    
    $RESULT = await chrome.Type($CONTEXT,{},'.jsb > center:nth-child(1) > input:nth-child(1)', 'Lebron James');

    c.expect(true).to.be.true;
  }).timeout(0);

})
