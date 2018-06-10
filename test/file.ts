import * as c from 'chai';
import * as m from 'mocha';
import * as file from '../src/file/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT,$RESULT;

m.beforeEach(() => {
  $CONTEXT = new RpsContext();
})


m.describe('File', () => {
  m.it('should create, append, delete file', async function() {
    let pathDirectory = "./test/fixture/tempfilename.txt";
    let content = "Hello";

    let create = file.Write($CONTEXT,{});
    let append = file.Append($CONTEXT,{});
    let read = file.Read($CONTEXT,{});
    let del = file.Delete($CONTEXT,{});
    let exists = file.Exists($CONTEXT,{});

    $RESULT = await create(pathDirectory);
    $RESULT = await exists(pathDirectory);

    c.expect($RESULT).to.be.true; //file exist

    $RESULT = await append(pathDirectory, content);
    $RESULT = await read(pathDirectory);

    c.expect($RESULT).to.contains(content);  //content is written

    $RESULT = await del(pathDirectory);
    $RESULT = await exists(pathDirectory);

    c.expect($RESULT).to.be.false;    //removed
  });

})
