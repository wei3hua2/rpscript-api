import * as c from 'chai';
import {RpsContext} from '../src/context';
import * as chrome from '../src/chrome/expressions';


describe.skip('Chrome', () => {
  xit('should launch & close chrome', (done) => {
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

  });

  it('Click on Page', (done) => {
    let $CONTEXT = new RpsContext();

    chrome.Launch($CONTEXT,[]).then((res)=>{
      chrome.Run($CONTEXT,"page.goto",["https://www.yahoo.com"]).then((res)=>{
        done();
      });
    });


  }).timeout(0);

})
