/**
 * @module Chrome
 */

// import {LaunchModel,NavigateModel,TypeModel,ClickModel,CloseModel} from './model/model';
import {RpsContext} from '../context';
import {ChromeUtil} from './util';
import {emitter} from '../decorators';
import { Response, ElementHandle } from 'puppeteer';

export default class chrome {

  static util = new ChromeUtil();

  @emitter('action','chrome')
  static async Open (ctx:RpsContext, opts:any, ...arg:string[]) : Promise<Response> {
    let response = undefined;
    if(!ctx.chrome.getCurrentBrowser()) {
      await chrome.util.launch(ctx,opts);
      response = await ctx.chrome.getCurrentPage();
    }
    else 
      response = await chrome.util.newPage(ctx);
  
    //async call
    if(arg[0]) chrome.util.goto(ctx, opts, arg[0]);
  
    return response;
  }

  @emitter('action','chrome')
  static Close (ctx:RpsContext,opts:any) : Promise<void> {
    return chrome.util.close(ctx,opts);
  }

  @emitter('action','chrome')
  static Goto (ctx:RpsContext,opts:any, url:string) : Promise<Response> {
    return chrome.util.goto(ctx,opts,url);
  }

  @emitter('action','chrome')
  static Click (ctx:RpsContext,opts:any, selector:string) : Promise<void> {
    return chrome.util.click(ctx,opts,selector);
  }

  @emitter('action','chrome')
  static Type (ctx:RpsContext,opts:any, selector:string, text:string) : Promise<void> {
    return chrome.util.type(ctx,opts,selector,text);
  }

  @emitter('action','chrome')
  static Eval (ctx:RpsContext,opts:any, str:string) : Promise<any> {
    return chrome.util.evaluate(ctx,opts,str);
  }

  @emitter('action','chrome')
  static Pdf (ctx:RpsContext,opts:any) : Promise<Buffer> {
    return chrome.util.pdf(ctx,opts);
  }

  @emitter('action','chrome')
  static Screenshot (ctx:RpsContext,opts:any) : Promise<Buffer> {
    return chrome.util.screenshot(ctx,opts);
  }
  
  @emitter('action','chrome')
  static $(ctx:RpsContext, opts:any,selector:string) : Promise<ElementHandle> {
    return chrome.util.$(ctx,opts,selector);
  }

  @emitter('action','chrome')
  static $$(ctx:RpsContext, opts:any,selector:string) : Promise<ElementHandle[]> {
    return chrome.util.$$(ctx,opts,selector);
  }
  
  @emitter('action','chrome')
  static Emulate (ctx:RpsContext,opts:any,device:string) : Promise<void> {
    if(device ==='screen' || device === 'print')
      return chrome.util.emulateMedia(ctx,opts,device);
    else
      return chrome.util.emulate(ctx,opts,device);
  }
  
}











// export function Launch (ctx:RpsContext,opts:any, ...arg:string[]) : Promise<any> {
//   return chromeUtil.launch(ctx);
// }