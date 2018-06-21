/**
 * @module Common
 */

import opn from 'opn';
import {ChildProcess} from 'child_process';
import shelljs from 'shelljs';
import {ExecOutputReturnValue} from 'shelljs';
import {RpsContext} from '../context';
import R from 'ramda';
import notifier from 'node-notifier';
import { EventEmitter } from 'events';
import {emitter} from '../decorators';


export default class common {

  @emitter("action","common")
  static Echo (ctx:RpsContext,opts:{}, ent:string) : Promise<any>{
    console.log(ent);
    return Promise.resolve(ctx.$RESULT);
  }

  @emitter("action","common")
  static Open (ctx:RpsContext,opts:{}, filepath:string) : Promise<ChildProcess|ExecOutputReturnValue>{
    if(process.platform === 'linux'){
      let cp = shelljs.exec(`xdg-open ${filepath}`);
      return Promise.resolve(cp);
    }
    else return opn(filepath);
  }

  @emitter("action","common")
  static Wait (ctx:RpsContext,opts:{}, period:number) : Promise<any>{
    return new Promise(function(resolve) {
      setTimeout(function () {
        resolve(ctx.$RESULT);
      }, period*1000);
    });
  }

  @emitter("action","common")
  static Notify (ctx:RpsContext,opts:{}, title:string, message?:string) : Promise<boolean>{
    notifier.notify({title:title,message: message? message : title});
    
    return Promise.resolve(true);
  }

  @emitter("action","common")
  static As (ctx:RpsContext,opts:{}, variable:string, value:any) : Promise<any>{
    ctx.variables[variable] = value;
    return Promise.resolve(value);
  }

  @emitter("action","common")
  static Once (ctx:RpsContext,opts:{}, event:EventEmitter, evtName:string) : Promise<any>{
    return new Promise(function(resolve) {
      event.once(evtName, (...params) => resolve(params));
    });
  }
}
