import * as c from 'chai';
import R from 'ramda';
import {RpsContext} from '../src/context';
import * as chrome from '../src/chrome/expressions';
import * as common from '../src/common/expressions';
import * as fn from '../src/functional/expressions';
import * as test from '../src/test/expressions';
import * as file from '../src/file/expressions';

let $CONTEXT, $RESULT;
describe('Chrome', () => {

  beforeEach(() => {
    $CONTEXT = new RpsContext();
    // $RESULT = $CONTEXT.$RESULT;
  })

  xit('should nav to google and popup', async () => {

    let $RESULT = await chrome.Open($CONTEXT,{},"https://www.google.com.sg");

    $RESULT = await common.Once($CONTEXT,{},$RESULT,'load');

    $RESULT = await chrome.Eval($CONTEXT,{},`alert('page loaded');`);

    c.expect(true).to.be.true;
  }).timeout(0);

  xit('should nav to google, type lebron, click search', async function() {

    let $RESULT = await chrome.Open($CONTEXT,{},"https://www.google.com.sg");

    $RESULT = await common.Once($CONTEXT,{},$RESULT,'load');

    $RESULT = await chrome.Type($CONTEXT,{},'#lst-ib', 'Lebron James');

    $RESULT = await common.Wait($CONTEXT,{},3);
    
    $RESULT = await chrome.Click($CONTEXT,{},'.jsb > center:nth-child(1) > input:nth-child(1)');

    c.expect(true).to.be.true;
  }).timeout(0);

  xit('should screenshot page', async function(){
    try{
      $CONTEXT.$RESULT = await chrome.Open($CONTEXT,{},"http://dilbert.com/");

      $CONTEXT.$RESULT = await common.Wait($CONTEXT,{},5);

      $CONTEXT.$RESULT = await chrome.Screenshot($CONTEXT,{path:'dilbert-page.png'});

      $CONTEXT.$RESULT = await common.Wait($CONTEXT,{},3);

      $CONTEXT.$RESULT = await chrome.$($CONTEXT,{},"div.comic-item-container:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(3) > a:nth-child(1) > img:nth-child(1)");

      $CONTEXT.$RESULT = await common.Wait($CONTEXT,{},1);

      await $CONTEXT.$RESULT.screenshot({path:'dilbert-cartoon.png'});

      $CONTEXT.$RESULT = await common.Wait($CONTEXT,{},2);

      await chrome.Close($CONTEXT,{});

      c.expect(true).to.be.true;

    }catch(err){
      await common.Notify($CONTEXT,{},"Error",err.message);
      console.error(err.message);
      c.expect(false).to.be.true;
    }
  }).timeout(0);

  xit('should generate PDF from ycombinator', async function () {
    try{
      let $RESULT = await chrome.Open($CONTEXT,{},"https://www.google.com.sg");

      $RESULT = await chrome.Emulate($CONTEXT,{},'screen');

      $RESULT = await common.Wait($CONTEXT,{},3);

      $RESULT = await chrome.Emulate($CONTEXT,{},'print');

      $RESULT = await common.Wait($CONTEXT,{},3);

      $RESULT = await chrome.Emulate($CONTEXT,{},'iPhone 6');

      $RESULT = await common.Wait($CONTEXT,{},3);

      $RESULT = await chrome.Emulate($CONTEXT,{},'iPhone 6 landscape');

      $RESULT = await common.Wait($CONTEXT,{},3);

      $RESULT = await chrome.Close($CONTEXT,{});

      // let exists = await file.Exists($CONTEXT,{},"hn.pdf");

      // $RESULT = await common.Open($CONTEXT,{},"hn.pdf");

      // c.expect(exists).to.be.true;

    }catch(err){
      await common.Notify($CONTEXT,{},"Error",err.message);
      console.error(err.message);
      c.expect(false).to.be.true;
    }

  }).timeout(0);

  it.only('should verify sites exists', async function () {
    let sites = ['https://www.github.com', 'https://www.google.com.sg',
    'https://mochajs.org','http://www.theuselessweb.com/','https://www.facebook.com/',
    'http://somewebsite.co/'];

    $CONTEXT.$RESULT = await chrome.Open($CONTEXT,{headless:true},"about:blank");

    await common.Wait($CONTEXT,{},2);

    await fn.ForEach($CONTEXT,{}, async function(site) {

      test.TestCase($CONTEXT,{},"should be ok "+site, async function() {
        
        $CONTEXT.$RESULT = await chrome.Goto($CONTEXT,{},site);

        test.Expect($CONTEXT,{},$CONTEXT.$RESULT.ok(), null, "to","be","true");
      
      });
    } , sites);

    $CONTEXT.$RESULT = await test.TestReport($CONTEXT,{});

    
    await common.Wait($CONTEXT,{},3);
    await chrome.Close($CONTEXT,{});

    common.Open($CONTEXT,{},"./mochawesome-report/mochawesome.html");

  }).timeout(0);
})

// /**** VERSION 1 ****/ 

// declare sites ["siteA","siteB"]
// open "about:blank"
// wait 2
// forEach sites @ $site {
//   testCase `should be ok ${site}`, {
//     goto $site
//     expect $RESULT.ok() to be true
//   }
// }
// testRun
// wait 3
// close
// open "report.html"

// /**** VERSION 2 ****/ 

// declare sites ["siteA","siteB"]
// open "about:blank"
// wait 2
// forEach sites @testCaseSite
// testRun
// wait 3
// close
// open "report.html"

// @testCaseSite $site {
//   testCase `should be ok ${site}`, {
//     goto $site
//     expect $RESULT.ok() to be true
//   } 
// }
// /**** or ****/
// @testCaseSite $site {
//   testCase `should be ok ${site}` @testCaseSteps
// }
// @testCaseSteps $site {
//   goto $site
//   expect $RESULT.ok() to be true
// }
// @testCaseSteps $site:
//   goto $site
//   expect $RESULT.ok() to be true
