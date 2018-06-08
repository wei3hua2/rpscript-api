import * as c from 'chai';
import chaiAsPromised from "chai-as-promised";
import * as m from 'mocha';
import {RpsContext} from '../src/context';
import * as chrome from '../src/chrome/expressions';

m.before(() => {
    c.should();
    c.use(chaiAsPromised);
});


m.describe('Chrome', () => {
  m.xit('should launch & close chrome', (done) => {
    let $CONTEXT = new RpsContext();

    chrome.Launch($CONTEXT,[]).then((res)=>{
      c.expect($CONTEXT.chrome).to.exist;
      // c.expect($CONTEXT.chrome.windows[0]).to.exist;
      // c.expect($CONTEXT.chrome.windows[0].id).to.exist;
      // c.expect($CONTEXT.chrome.windows[0].webSocketDebuggerUrl).to.exist;
      // c.expect($CONTEXT.chrome.windows[0].cdp).to.exist;

      // chrome.Close($CONTEXT,[]).then(res=>{
        done();
      // });

    });

  }).timeout(0);

  m.it('Click on Page', (done) => {
    let $CONTEXT = new RpsContext();

    chrome.Launch($CONTEXT,[]).then((res)=>{
      chrome.Run($CONTEXT,"pageGoto",["https://www.yahoo.com"]).then((res)=>{
        done();
      });
    });


  }).timeout(0);

})
