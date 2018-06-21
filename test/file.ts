import * as c from 'chai';
import file from '../src/file/expressions';
import {RpsContext} from '../src/context';

let $CONTEXT,$RESULT;

beforeEach(() => {
  $CONTEXT = new RpsContext();
})


describe('File', () => {
  it('should create, append, delete file', async function() {
    let pathDirectory = "./test/fixture/tempfilename.txt";
    let content = "Hello";

    $RESULT = await file.Write($CONTEXT,{},pathDirectory);
    $RESULT = await file.Exists($CONTEXT,{},pathDirectory);

    c.expect($RESULT).to.be.true; //file exist

    $RESULT = await file.Append($CONTEXT,{},pathDirectory, content);
    $RESULT = await file.Read($CONTEXT,{},pathDirectory);

    c.expect($RESULT).to.contains(content);  //content is written

    $RESULT = await file.Delete($CONTEXT,{},pathDirectory);
    $RESULT = await file.Exists($CONTEXT,{},pathDirectory);

    c.expect($RESULT).to.be.false;    //removed
  });

})
