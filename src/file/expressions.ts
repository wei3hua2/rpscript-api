/**
 * @module File
 */

import fs from 'fs';
import {RpsContext} from '../context';
import R from 'ramda';

export function _Read(ctx:RpsContext, opts:{}, filepath:string) : Promise<string>{
  return new Promise((resolve, reject) => {
    fs.readFile(filepath,'utf8',(err,data) =>
    {
      if(err) reject(err);
      else resolve(data);
    });
  });
}
let Read = R.curry(_Read);
export {Read};


export function _Append(ctx:RpsContext, opts:{}, filename:string, content:string) : Promise<void>{
  return new Promise((resolve, reject) => {
    fs.appendFile(filename,content,'utf8',(err) =>
    {
      if(err) reject(err);
      else resolve();
    });
  });
}
let Append = R.curry(_Append);
export {Append};


export function _Write (ctx:RpsContext, opts:{}, filename:string, content?:string) : Promise<void> {
  if(!content) content = '';

  return new Promise((resolve, reject) => {
    fs.writeFile(filename,content,'utf8',(err) => {
      if(err) reject(err);
      else resolve();
    });
  });
};
let Write = R.curryN(3,_Write);
export {Write};

//delete - unlink
export function _Delete (ctx:RpsContext, opts:{}, filename:string) : Promise<void> {

  return new Promise((resolve, reject) => {
    fs.unlink(filename,(err) =>
    {
      if(err) reject(err);
      else resolve();
    });
  });
};
let Delete = R.curry(_Delete);
export {Delete};

export function _Exists (ctx:RpsContext, opts:{}, filepath:string) : Promise<boolean> {
  return Promise.resolve(fs.existsSync(filepath));
};
let Exists = R.curry(_Exists);
export {Exists};


export function _Rename (ctx:RpsContext, opts:{}, oldpath:string, newpath:string) : Promise<void> {
  return new Promise((resolve, reject) => {
    fs.rename(oldpath,newpath,(err) =>
    {
      if(err) reject(err);
      else resolve();
    });
  });
};
let Rename = R.curry(_Rename);
export {Rename};

//Stat
export function _Stat (ctx:RpsContext, opts:{}, filepath:string) : Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(filepath,(err, stats) =>
    {
      if(err) reject(err);
      else resolve(stats);
    });
  });
};
let Stat = R.curry(_Stat);
export {Stat};
