/**
 * @module Functional
 */
import fs from 'fs';
import opn from 'opn';
import shelljs from 'shelljs';
import {MapModel} from './model/model';
import {RpsContext} from '../context';
import R from 'ramda';

export function Map (ctx:RpsContext,args:any[],opts?:Object) : Promise<any> {
  let model = new MapModel(args,opts);

  return Promise.resolve(
    model.functor ?  R.map(model.funct)(model.functor) : R.map(model.funct)
  );
}
