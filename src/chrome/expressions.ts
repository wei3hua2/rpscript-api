/**
 * @module Chrome
 */

// import {LaunchModel,NavigateModel,TypeModel,ClickModel,CloseModel} from './model/model';
import {RpsContext} from '../context';
import {ChromeUtil} from './util';

let chromeUtil = new ChromeUtil();

export async function Open (ctx:RpsContext, opts:any, ...arg:string[]) : Promise<any> {
  let response = undefined;
  if(!ctx.chrome.getCurrentBrowser()) {
    await chromeUtil.launch(ctx);
    response = await ctx.chrome.getCurrentPage();
  }
  else 
    response = await chromeUtil.newPage(ctx);

  //async call
  if(arg[0]) chromeUtil.goto(ctx, opts, arg[0]);

  return response;
}
export function Close (ctx:RpsContext,opts:any) : Promise<void> {
  return chromeUtil.close(ctx,opts);
}
export function Goto (ctx:RpsContext,opts:any, url:string) : Promise<any> {
  return chromeUtil.goto(ctx,opts,url);
}
export function Click (ctx:RpsContext,opts:any, selector:string) : Promise<any> {
  return chromeUtil.click(ctx,opts,selector);
}
export function Type (ctx:RpsContext,opts:any, selector:string, text:string) : Promise<any> {
  return chromeUtil.type(ctx,opts,selector,text);
}
export function Eval (ctx:RpsContext,opts:any, str:string) : Promise<any> {
  return chromeUtil.evaluate(ctx,opts,str);
}









// export function Launch (ctx:RpsContext,opts:any, ...arg:string[]) : Promise<any> {
//   return chromeUtil.launch(ctx);
// }