import * as c from 'chai';
import common from '../src/common/expressions';
import {RpsContext} from '../src/context';
import { EventEmitter } from 'events';

let $CONTEXT;

beforeEach(() => {
  $CONTEXT = new RpsContext();
  $CONTEXT.event = new EventEmitter();
})

describe.skip('Common', () => {
  it('open testopen.txt', async function() {
    $CONTEXT.event.on("action",(...args)=> {
      console.log(args);
    })
    let pathDirectory = "./test/fixture/testopen.txt", period = 1;

    $CONTEXT.$RESULT = await common.Open($CONTEXT,{},pathDirectory);
    $CONTEXT.$RESULT = await common.Wait($CONTEXT,{},period);
  }).timeout(0);

  it('should emitter action', async function () {
    
    $CONTEXT.event.on("action",(...args)=> {
      console.log(args);
    })

    $CONTEXT.$RESULT = await common.Echo($CONTEXT,{},"hello world");
    $CONTEXT.$RESULT = await common.Echo($CONTEXT,{},"hello underscore");
  });

})
