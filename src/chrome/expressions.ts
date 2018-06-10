/**
 * @module Chrome
 */

import {LaunchModel,NavigateModel,TypeModel,ClickModel,CloseModel} from './model/model';
import {RpsContext} from '../context';
import {ChromeUtil} from './util';

let chromeUtil = new ChromeUtil();

export function Launch (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
  let model = new LaunchModel(arg,opts);
  return chromeUtil.launch(ctx);
}

export function Run (ctx:RpsContext,command:string, arg:string[],opts?:any) : Promise<any> {
  return chromeUtil.run(ctx,command,arg,opts);
}

// export function Navigate (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
//   let model = new NavigateModel(arg,opts);
//   return chromeUtil.navigate(model.url);
// }
//
// export function Type (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
//   let model = new TypeModel(arg,opts);
//   return chromeUtil.type(model.text);
// }
//
// export function Click (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
//   let model = new ClickModel(arg,opts);
//
//   return chromeUtil.click(model.element);
// }
//
// export function Close (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
//   let model = new CloseModel(arg,opts);
//   return chromeUtil.close(ctx);
// }
