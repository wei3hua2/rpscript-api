/**
 * @module Common
 */

import opn from 'opn';
import shelljs from 'shelljs';
import {RpsContext} from '../context';
import R from 'ramda';
import notifier from 'node-notifier';
import { EventEmitter } from 'events';

function _Open (ctx:RpsContext,opts:{}, filepath:string) : Promise<any> {
  ctx.event.emit("action","open", filepath);
  //workaround for not working on my machine
  if(process.platform === 'linux'){
    shelljs.exec(`xdg-open ${filepath}`);
    return Promise.resolve();
  }
  else return opn(filepath);
}
let Open = R.curry(_Open);
export {Open};


function _Wait (ctx:RpsContext,opts:{}, period:number) : Promise<any> {
  return new Promise(function(resolve) {
      ctx.event.emit("action","wait", period);
      setTimeout(resolve,period*1000);
  });
}
let Wait = R.curry(_Wait);
export {Wait};

function _Notify (ctx:RpsContext,opts:{}, title:string, message:string) : Promise<any> {
  return new Promise(function(resolve) {
      ctx.event.emit("action","notify", message, title);

       notifier.notify({title:title,message:message});
       resolve(true);
  });
}
let Notify = R.curry(_Notify);
export {Notify};

function _Echo (ctx:RpsContext,opts:{}, ent:string) : Promise<any> {
  return new Promise(function(resolve) {
      ctx.event.emit("action","echo", ent);
      console.log(ent);
      resolve(true);
  });
}
let Echo = R.curry(_Echo);
export {Echo};

function _Once (ctx:RpsContext,opts:{}, event:EventEmitter, evtName:string) : Promise<any> {
  return new Promise(function(resolve) {
      ctx.event.emit("action","once", evtName);
      event.once(evtName, (...params) => resolve(params));
  });
}
let Once = R.curry(_Once);
export {Once};