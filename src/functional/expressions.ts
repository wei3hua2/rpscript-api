/**
 * @module Functional
 */
import {RpsContext} from '../context';
import R from 'ramda';


export function Map (ctx:RpsContext,opts:{}, fn?, functor?) : Promise<any> {
  return Promise.resolve(
    functor ? R.map(fn,functor) : R.map(fn)
  );
}

export function Filter (ctx:RpsContext,opts:{}, fn?, functor?) : Promise<any> {
  return Promise.resolve(
    functor ? R.filter(fn,functor) : R.filter(fn)
  );
}

export async function ForEach (ctx:RpsContext, opts:{}, fn?,functor?) : Promise<void> {
  for(var i =0;i<functor.length;i++){
    let item = functor[i];
    await fn(item);
  }
}
