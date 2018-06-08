import fs from 'fs';
import opn from 'opn';
import shelljs from 'shelljs';
import {OpenModel, WaitModel, CreateModel, TypeModel} from './model/model';
import {RpsContext} from '../context';

var robot = require('robotjs');

export function Open (ctx:RpsContext,arg:string[],opts?:any) : Promise<any> {
  let model = new OpenModel(arg,opts);

  //workaround for not working on my machine
  if(process.platform === 'linux'){
    shelljs.exec(`xdg-open ${model.filepath}`);
    return Promise.resolve(true);
  }
  else return opn(model.filepath);
}

export function Wait (ctx:RpsContext,arg:string[],opts?:any) : Promise<boolean> {
  let model = new WaitModel(arg,opts);

  return new Promise(function(resolve) {
      setTimeout(resolve, model.period*1000);
  });
}

export function Create (ctx:RpsContext,arg:string[],opts?:any) : Promise<boolean> {
  let model = new CreateModel(arg,opts);
  fs.writeFileSync(model.filename,model.initialContent);

  return Promise.resolve(true);
}

export function Type (ctx:RpsContext,arg:string[], opts?:any) : Promise<any> {
  let model = new TypeModel(arg,opts);

  robot.typeStringDelayed(model.text,800);
  robot.keyTap("enter");

  return Promise.resolve(model.text);
}
