// import * as c from 'chai';
// import {RpsContext} from '../src/context';
// import * as rps from '../src/default';

// let $CONTEXT;

// beforeEach(() => {
//   $CONTEXT = new RpsContext();
// })

// describe.skip('Defaults', () => {
//   it('open testopen.txt', async function() {
//     let pathDirectory = "./test/fixture/testopen.txt", period = 1, $RESULT:any = undefined;

//     let open = rps.Open($CONTEXT,{});
//     let wait = rps.Wait($CONTEXT,{});
//     let type = rps.Type($CONTEXT,{});
//     let enter = rps.Type($CONTEXT,{tap:true});
//     let tap = rps.Type($CONTEXT,{tap:true,tapModifier:["control"]});

//     $RESULT = await open(pathDirectory);

//     $RESULT = await wait(period);
    
//     $RESULT = await type("hello world");
    
//     $RESULT = await enter("enter");
    
//     $RESULT = await rps.DesktopInfo($CONTEXT,{});
//     $RESULT = await type( JSON.stringify($RESULT,null,'\t') );
    
//     $RESULT = await wait(1);
//     $RESULT = await tap("s");
//     $RESULT = await wait(1);
//     $RESULT = await tap("q");

//   });

// })
