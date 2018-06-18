import opn from 'opn';
// import fs from 'fs';
import shelljs from 'shelljs';
import request from 'request';
import asyncPolling from 'async-polling';
import {RpsContext} from '../context';
import {ChromeContext,ChromeConfig} from './model/context';
import _ from 'lodash';

import puppeteer from 'puppeteer';
import {ElementHandle, JSHandle,Browser,Page,Response} from 'puppeteer';

const CDP = require('chrome-remote-interface');

export class ChromeUtil {

  cdp:any = undefined;

  constructor(){}

  async launch(ctx:RpsContext) : Promise<Browser>{
    let browser = await this.launchNewChrome(ctx.chrome.config);
    ctx.chrome.addBrowser(browser);

    return browser;
  }

  async newPage(ctx:RpsContext) : Promise<Page>{
    let page = await ctx.chrome.getCurrentBrowser().newPage();
    await ctx.chrome.updateCurrentPage();

    return page;
  }

  async close(ctx:RpsContext, opts:any) :Promise<void>{
    let result = await this.run(ctx,'page.close',opts);
    await ctx.chrome.updateCurrentPage();
  }

//======  page

  $ = (ctx:RpsContext, opts:any, selector:string) : Promise<ElementHandle> => this.run(ctx,'page.$',opts);
  $$ = (ctx:RpsContext, opts:any, selector:string) : Promise<ElementHandle[]> => this.run(ctx,'page.$$',opts);
  $$eval = (ctx:RpsContext, opts:any, selector:string, pageFn:any, ...args) : Promise<ElementHandle[]> => this.run(ctx,'page.$$eval',opts,pageFn,...args)
  $eval = (ctx:RpsContext, opts:any, selector:string, pageFn:any, ...args) : Promise<ElementHandle[]>  => this.run(ctx,'page.$eval',opts,pageFn,...args)
  $x = (ctx:RpsContext, opts:any, expression:string) : Promise<ElementHandle[]> => this.run(ctx,'page.$x',opts,expression);

  addScriptTag = (ctx:RpsContext, opts:any) : Promise<ElementHandle> => this.run(ctx,'page.addScriptTag',opts)
  addStyleTag = (ctx:RpsContext, opts:any) : Promise<ElementHandle> => this.run(ctx,'page.addStyleTag',opts)

  authenticate = (ctx:RpsContext, opts:any, credential:Object) : Promise<any> => this.run(ctx,'page.authenticate',opts, credential)

  bringToFront = (ctx:RpsContext, opts:any) : Promise<any> => this.run(ctx,'page.bringToFront',opts)

  browser = (ctx:RpsContext, opts:any) : Promise<any> => this.run(ctx,'page.browser',opts);
  click = (ctx:RpsContext, opts:any, selector:string) : Promise<any> => this.run(ctx,'page.click',opts, selector);
  content = (ctx:RpsContext, opts:any) : Promise<string> => this.run(ctx,'page.content',opts)

  cookies = (ctx:RpsContext, opts:any, ...urls:string[]) : Promise<Object[]> => this.run(ctx,'page.cookies',opts,...urls)
  deleteCookie = (ctx:RpsContext, opts:any, ...cookies:Object[]) : Promise<any> => this.run(ctx,'page.deleteCookie',opts,...cookies);
  setCookie = (ctx:RpsContext, opts:any, ...cookies:Object[]) : Promise<any> => this.run(ctx,'page.setCookie',opts,...cookies);

  emulate = (ctx:RpsContext, opts:any) : Promise<any> => this.run(ctx,'page.emulate',opts);
  emulateMedia = (ctx:RpsContext, opts:any, mediaType:string) : Promise<any> => this.run(ctx,'page.emulateMedia',opts, mediaType);
  
  evaluate = (ctx:RpsContext, opts:any, str:string|Function,...args ) : Promise<any> => this.run(ctx,'page.evaluate',opts,str,args)
  evaluateHandle = (ctx:RpsContext, opts:any, str:string|Function,...args ) : Promise<JSHandle> => this.run(ctx,'page.evaluateHandle',opts,str,args)
  evaluateOnNewDocument = (ctx:RpsContext, opts:any, pageFn:string|Function,...args ) : Promise<void> => this.run(ctx,'page.evaluate',opts,pageFn,args)
  exposeFunction = (ctx:RpsContext, opts:any, name:string, pageFn:Function ) : Promise<void> => this.run(ctx,'page.exposeFunction',opts,name, pageFn)

  focus = (ctx:RpsContext, opts:any, selector:string ) : Promise<any> => this.run(ctx,'page.focus',opts,selector)

  goBack = (ctx:RpsContext, opts:any ) : Promise<Response> => this.run(ctx,'page.goBack',opts)
  goForward = (ctx:RpsContext, opts:any ) : Promise<Response> => this.run(ctx,'page.goForward',opts)
  goto = (ctx:RpsContext, opts:any, url:string) : Promise<Response> => this.run(ctx,'page.goto',opts,url);  
  hover = (ctx:RpsContext, opts:any, selector:string ) : Promise<any> => this.run(ctx,'page.hover',opts);
  isClosed = (ctx:RpsContext, opts:any ) : Promise<boolean> => this.run(ctx,'page.isClosed',opts);
  pdf = (ctx:RpsContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.pdf',opts);
  
  queryObject = (ctx:RpsContext, opts:any, prototypeHandle:JSHandle ) : Promise<JSHandle> => this.run(ctx,'page.queryHandle',opts, prototypeHandle);
  reload = (ctx:RpsContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.reload',opts);
  screenshot = (ctx:RpsContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.screenshot',opts);

  select = (ctx:RpsContext, opts:any, selector:string, ...values:string[] ) : Promise<string[]> => this.run(ctx,'page.select',opts,selector,...values);

  setBypassCSP = (ctx:RpsContext, opts:any, enabled:boolean ) : Promise<any> => this.run(ctx,'page.setBypassCSP',opts,enabled);
  setCacheEnabled = (ctx:RpsContext, opts:any, enabled:boolean ) : Promise<any> => this.run(ctx,'page.setCacheEnabled',opts,enabled);
  setContent = (ctx:RpsContext, opts:any, html:string ) : Promise<any> => this.run(ctx,'page.setContent',opts,html);
  setDefaultNavigationTimeout = (ctx:RpsContext, opts:any, timeout:number ) : Promise<any> => this.run(ctx,'page.setDefaultNavigationTimeout',opts,timeout);
  setExtraHTTPHeaders = (ctx:RpsContext, opts:any, header:Object ) : Promise<any> => this.run(ctx,'page.setExtraHTTPHeaders',opts,header);
  setJavaScriptEnabled = (ctx:RpsContext, opts:any, enabled:boolean ) : Promise<any> => this.run(ctx,'page.setExtraHTTPHeaders',opts,enabled);
  setOfflineMode = (ctx:RpsContext, opts:any, enabled:boolean ) : Promise<any> => this.run(ctx,'page.setOfflineMode',opts,enabled);
  setRequestInterception = (ctx:RpsContext, opts:any, value:boolean ) : Promise<any> => this.run(ctx,'page.setOfflineMode',opts,value);
  setUserAgent = (ctx:RpsContext, opts:any, userAgent:string ) : Promise<any> => this.run(ctx,'page.setUserAgent',opts,userAgent);
  setViewport = (ctx:RpsContext, opts:any, viewPort:Object ) : Promise<any> => this.run(ctx,'page.setUserAgent',opts,viewPort);

  tap = (ctx:RpsContext, opts:any, selector:string ) : Promise<any> => this.run(ctx,'page.tap',opts, selector);

  title = (ctx:RpsContext, opts:any) : Promise<string> => this.run(ctx,'page.tap',opts);
  type = (ctx:RpsContext, opts:any, selector:string, text) : Promise<any> => this.run(ctx,'page.type',opts, selector,text);

  waitFor = (ctx:RpsContext, opts:any,selectorOrFunctionOrTimeout:string|number|Function) : Promise<JSHandle> => this.run(ctx,'page.waitFor',opts, selectorOrFunctionOrTimeout);
  waitForFunction = (ctx:RpsContext, opts:any, pageFn:Function|string) : Promise<JSHandle> => this.run(ctx,'page.waitForFunction',opts,pageFn);
  waitForNavigation = (ctx:RpsContext, opts:any) : Promise<Response> => this.run(ctx,'page.waitForNavigation',opts);
  waitForSelector = (ctx:RpsContext, opts:any, selector:string) : Promise<ElementHandle> => this.run(ctx,'page.waitForSelector',opts, selector);
  waitForXPath = (ctx:RpsContext, opts:any, xpath:string) : Promise<ElementHandle> => this.run(ctx,'page.waitForXPath',opts);

  url = async (ctx:RpsContext, opts:any) : Promise<string> => (await ctx.chrome.getCurrentPage()).url();
  viewport = async (ctx:RpsContext, opts:any) : Promise<Object> => (await ctx.chrome.getCurrentPage()).viewport();
  metrics = async (ctx:RpsContext, opts:any) : Promise<Object> => this.run(ctx,'page.metrics',opts);

  //======  mouse
  mouseClick = (ctx:RpsContext, opts:any, x:number,y:number) : Promise<void> => this.run(ctx,'mouse.click',opts, x, y);
  mouseMove = (ctx:RpsContext, opts:any, x:number,y:number) : Promise<void> => this.run(ctx,'mouse.move',opts, x, y);
  mouseDown = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'mouse.down',opts);

  //======  keyword
  keyboardDown = (ctx:RpsContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.down',opts,key);
  keyboardPress = (ctx:RpsContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.down',opts,key);
  keyboardSendChar = (ctx:RpsContext, opts:any, char:string) : Promise<void> => this.run(ctx,'keyboard.sendCharacter',opts,char);
  keyboardType = (ctx:RpsContext, opts:any,text:string) : Promise<void> => this.run(ctx,'keyboard.type',opts,text);
  keyboardUp = (ctx:RpsContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.up',opts,key);

  //====== touchscreen
  touchscreenTap = (ctx:RpsContext, opts:any,x:number,y:number) : Promise<void> => this.run(ctx,'touchscreen.tap',opts,x,y);

  //======  coverage
  startCSSCoverage = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'coverage.startCSSCoverage',opts);
  stopCSSCoverage = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'coverage.stopCSSCoverage',opts);
  startJSCoverage = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'coverage.startJSCoverage',opts);
  stopJSCoverage = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'coverage.stopJSCoverage',opts);

  //======  tracing
  tracingStart = (ctx:RpsContext, opts:any) : Promise<void> => this.run(ctx,'tracing.start',opts);
  tracingStop = (ctx:RpsContext, opts:any) : Promise<Buffer> => this.run(ctx,'tracing.stop',opts);

  // =================================

  //command: example
  // page.click , {button:'left', delay:1000}, '#select'
  async run(ctx:RpsContext, command:string, opts:any, ...args:any[]) : Promise<any>{

    let clazz = command.split('.')[0];
    let action = command.split('.')[1];
    let params = [].concat(args, opts);

    let result = null;
    let entity = null;
    
    if(clazz === 'page') entity = await ctx.chrome.getCurrentPage();
    else if(clazz === 'browser') entity = ctx.chrome.getCurrentBrowser();
    else if(clazz === 'coverage') entity = (await ctx.chrome.getCurrentPage()).coverage;
    else if(clazz === 'keyboard') entity = (await ctx.chrome.getCurrentPage()).keyboard;
    else if(clazz === 'mouse') entity = (await ctx.chrome.getCurrentPage()).mouse;
    else if(clazz === 'touchscreen') entity = (await ctx.chrome.getCurrentPage()).touchscreen;
    else if(clazz === 'tracing') entity = (await ctx.chrome.getCurrentPage()).tracing;
    // else if(clazz === 'frame') entity = (await ctx.chrome.getCurrentPage()).mainFrame();
    // else if(clazz === 'target') entity = (await ctx.chrome.getCurrentPage()).target;
    // else if(clazz === 'worker') entity = (await ctx.chrome.getCurrentPage()).workers();
    

    result = await entity[action].apply(entity, params);

    return result;
  }

  private async launchNewChrome(config:ChromeConfig): Promise<puppeteer.Browser> {
    let browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox',
             `--user-data-dir=${config.userdataDir}`, `--window-size=${config.winSize}`]
    });
    return browser;
  }

  private async launchDefaultChrome(config:ChromeConfig): Promise<puppeteer.Browser> {
    let url = "about:blank";

    opn(`${url}`,{app: [
      this.deriveOsChromeName(),
      `--web-security=${config.webSecurity}`, `--remote-debugging-port=${config.debuggingPort}`,
      `--user-data-dir=${config.userdataDir}`, `--window-size=${config.winSize}`]});

    let info = await this.getDebuggingInfo();
    let browser = puppeteer.connect({browserWSEndpoint:info.webSocketDebuggerUrl});
    // let cdp = await CDP({tab:info.webSocketDebuggerUrl});
    return browser;
  }

  private getDebuggingInfo () {
    return new Promise<any>( (resolve, reject) => {

      let polling = asyncPolling( (end) => this.handleDebuggingInfo(end),5000);

      polling.on('error', function (error:any) {});
      polling.on('result',  (result:any) => this.handleResult(result, polling, resolve));

      polling.run();
    });
  }

  private handleDebuggingInfo (end:any) : void {
    request('http://localhost:9222/json', function (error, resp, body) {
      if(resp && resp.statusCode === 200) end(undefined, JSON.parse(body))
      else end(error);
    });
  }
  private handleResult(result:any, polling:any, resolve:any) : void{
    let output:any = _.find(result,{'url':'about:blank'});

    if(output && output['webSocketDebuggerUrl']) {
      resolve(output);
      polling.stop();
    }
  }

  private deriveOsChromeName () : string{
    if(process.platform === 'win32') return "chrome";
    else if (process.platform === 'linux') return "google-chrome";
    else if (process.platform === 'darwin') return "google chrome";
  }


}
