/**
 * @module Common
 */

import opn from 'opn';
import shelljs from 'shelljs';
import {RpsContext} from '../context';
import R from 'ramda';

function _Open (ctx:RpsContext,opts:{}, filepath:string) : Promise<any> {

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
      setTimeout(resolve,period*1000);
  });
}
let Wait = R.curry(_Wait);
export {Wait};
