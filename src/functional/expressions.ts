/**
 * @module Functional
 */
import {RpsContext} from '../context';
import R from 'ramda';
import {emitter} from '../decorators';


export default class functional {

  @emitter("action","functional")
  static Map (ctx:RpsContext,opts:{}, fn?, functor?) : Promise<any> {
    return Promise.resolve(
      functor ? R.map(fn,functor) : R.map(fn)
    );
  }
  
  @emitter("action","functional")
  static Filter (ctx:RpsContext,opts:{}, fn?, functor?) : Promise<any> {
    return Promise.resolve(
      functor ? R.filter(fn,functor) : R.filter(fn)
    );
  }
  
  @emitter("action","functional")
  static async ForEach (ctx:RpsContext, opts:{}, fn?,functor?) : Promise<void> {
    for(var i =0;i<functor.length;i++){
      let item = functor[i];
      await fn(item);
    }
  }
}


