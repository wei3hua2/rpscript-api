import opn from 'opn';
// import fs from 'fs';
import shelljs from 'shelljs';
import request from 'request';
import asyncPolling from 'async-polling';
import {RpsContext} from '../context';
import {ChromeContext,ChromeConfig} from './model/context';
import _ from 'lodash';

import puppeteer from 'puppeteer';

const CDP = require('chrome-remote-interface');

export class ChromeUtil {

  readonly chromeSwitches:string = "--user-data-dir=chrome/tagui_user_profile --remote-debugging-port=9222 --web-security=false about:blank";
  readonly headlessSwitch:string="--headless --disable-gpu";
  readonly darwinCommand:string = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  readonly linuxCommand:string = "google-chrome";
  readonly emptyIOCommand:string = "> /dev/null 2>&1 &";
  readonly windowSize:string="--window-size=1366,768";

  chromeProcessId:string = "";
  chromeId:string = "";
  // private _socketClient:any = undefined;
  cdp:any = undefined;

  constructor(){}

  async launch(ctx:RpsContext){
    // let browser = await this.launchDefaultChrome(ctx.chrome.config);
    let browser = await this.launchNewChrome(ctx.chrome.config);
    ctx.chrome.addBrowser(browser);

    return browser;
  }

  async newPage(ctx:RpsContext) {
    let page = await ctx.chrome.getCurrentBrowser().newPage();
    await ctx.chrome.updateCurrentPage();

    return page;
  }

  //command: example
  // pageClick , ['#select'], {button:'left', delay:1000}
  async run(ctx:RpsContext, command:string, args?:any[], opts?:any) {

    // let firstCapIndex = command.search((/[A-Z]/));
    // let clazz = command.substring(0,firstCapIndex);
    // let action = command.substring(firstCapIndex);
    // action = action.charAt(0).toLowerCase() + action.slice(1);

    let clazz = command.split('.')[0];
    let action = command.split('.')[1];
    let params = [].concat(args, opts);

    let result = null;

    if(clazz === 'page') {
      let page = await ctx.chrome.getCurrentPage();
      result = await page[action].apply(page, params);
    }else if(clazz === 'browser'){
      let browser = ctx.chrome.getCurrentBrowser();
      result = browser[action].apply(browser, params);
    }

    return result;
  }


  // async close(ctx:RpsContext){ return ctx.chrome.browser.close(); }
  // navigate(url:string){return Promise.resolve(true);}
  // type(text:string){return Promise.resolve(true);}
  // click(element:string){return Promise.resolve(true);}

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

  // setup() {
  // }
  // execute():any{
  //   return {
  //     expand: () => {
  //       Promise.resolve('TODO: expand chrome')
  //     },
  //     launch: () => this.launch(),
  //     url:() => Promise.resolve('TODO: url navigation')
  //   }
  // }
  // teardown(){}
  //
  // init () {
  //   fs.writeFileSync('tagui_chrome.in','');
  //   fs.writeFileSync('tagui_chrome.out','[0] START');
  // }
  // async launch () : Promise<any>{
  //   if(['aix','freebsd','linux','openbsd'].includes(process.platform)) return this.launchLinux();
  //   else if('darwin' === process.platform) return this.launchMac();
  //   else if('win32' === process.platform) return this.launchWin();
  //   else throw Error('os not supported');
  // }
  //
  // async navigate (url:string) : Promise<any>{
  //   return this.cdp.Page.navigate({url: url});
  // }
  //
  // async type (text:string) :Promise<any> {
  //   for(var i =0; i< text.length; i++){
  //     let result = await this.cdp.Input.dispatchKeyEvent({type:'char',text:text[i]});
  //   }
  //
  //   return await this.cdp.Input.dispatchKeyEvent({
  //     "type" : "rawKeyDown","windowsVirtualKeyCode" : 13,
  //     "unmodifiedText" : "\r","text" : "\r"});
  // }
  //
  // async click(element:string) : Promise<any> {
  //   return await this.cdp.Runtime.evaluate({
  //           expression: `document.querySelector('${element}').click()`
  //       });
  // }
  //
  // kill () : any {
  //   return this.cdp.close({id:this.chromeId});
  //   // return shell.exec(`kill ${this.getChromeProcessId()}`);
  // }
  //
  // private async launchLinux():Promise<any>{
  //   //TODO: check is command exists
  //
  //   return this.launchCommand(this.linuxCommand);
  // }
  //
  // private async launchMac():Promise<any>{
  //   if( !fs.existsSync(this.darwinCommand) ) throw Error('Chrome Not Found');
  //
  //   return this.launchCommand(this.darwinCommand);
  // }
  //
  // private async launchWin():Promise<any>{
  //   console.log('TODO: launch windows OS');
  //   throw new Error('TODO: launch windows OS');
  // }
  //
  //
  // private async launchCommand(chromeCommand:string) {
  //
  //   let successLaunched = await this.startLaunch(chromeCommand);
  //   if(successLaunched) {
  //     let result = await this.getWSUrl();
  //     this.cdp = await CDP({tab:result.webSocketDebuggerUrl});
  //     this.chromeId = result.id;
  //
  //     return {wsUrl:result.webSocketDebuggerUrl, pid:this.getChromeProcessId(), id:result.id};
  //   }else return {};
  // }
  //
  // private getChromeProcessId () :string {
  //   return shell.exec("ps a | grep remote-debugging-port=9222 | grep tagui_user_profile | sed -e 's/^[ ]*//' | cut -d' ' -f 1 | sort -nur | head -n 1").stdout.trim();
  // }
  //
  // private async startLaunch (chromeCommand:string) {
  //   return new Promise((resolve, reject) => {
  //
  //       shell.exec(`${chromeCommand} ${this.chromeSwitches} ${this.windowSize} ${this.emptyIOCommand}`,
  //          (code, stdout, stderr) => {
  //             if(stderr)reject(stderr);
  //             else resolve(true);
  //         });
  //   });
  // }
  //


}
