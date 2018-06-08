import fs from 'fs';
import opn from 'opn';
import shelljs from 'shelljs';

export function open (arg:string,opts?:any) {
  let filename = arg;
  filename = filename.replace(/"/g , "");

  //workaround for not working on my machine
  if(process.platform === 'linux'){
    shelljs.exec(`xdg-open ${filename}`);
    return Promise.resolve(true);
  }
  else return opn(filename);
}
