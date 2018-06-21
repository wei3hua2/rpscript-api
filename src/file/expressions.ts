/**
 * @module File
 */

import fs from 'fs';
import {RpsContext} from '../context';
import R from 'ramda';
import {emitter} from '../decorators';

export default class file {

  @emitter("action","file")
  static Read(ctx:RpsContext, opts:{}, filepath:string) : Promise<string>{
    return new Promise((resolve, reject) => {
      fs.readFile(filepath,'utf8',(err,data) =>
      {
        if(err) reject(err);
        else resolve(data);
      });
    });
  }

  @emitter("action", "file")
  static Append(ctx:RpsContext, opts:{}, filename:string, content:string) : Promise<void>{
    return new Promise((resolve, reject) => {
      fs.appendFile(filename,content,'utf8',(err) =>
      {
        if(err) reject(err);
        else resolve();
      });
    });
  }

  @emitter("action","file")
  static Write (ctx:RpsContext, opts:{}, filename:string, content?:string) : Promise<void> {
    if(!content) content = '';
  
    return new Promise((resolve, reject) => {
      fs.writeFile(filename,content,'utf8',(err) => {
        if(err) reject(err);
        else resolve();
      });
    });
  }

  @emitter("action","file")
  static Delete (ctx:RpsContext, opts:{}, filename:string) : Promise<void> {

    return new Promise((resolve, reject) => {
      fs.unlink(filename,(err) =>
      {
        if(err) reject(err);
        else resolve();
      });
    });
  }

  @emitter("action","file")
  static Exists (ctx:RpsContext, opts:{}, filepath:string) : Promise<boolean> {
    return Promise.resolve(fs.existsSync(filepath));
  }

  @emitter("action","file")
  static Rename (ctx:RpsContext, opts:{}, oldpath:string, newpath:string) : Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(oldpath,newpath,(err) =>
      {
        if(err) reject(err);
        else resolve();
      });
    });
  }
  
  @emitter("action","file")
  static Stat (ctx:RpsContext, opts:{}, filepath:string) : Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
      fs.stat(filepath,(err, stats) =>
      {
        if(err) reject(err);
        else resolve(stats);
      });
    });
  }
}

