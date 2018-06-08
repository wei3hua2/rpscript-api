import fs from 'fs';
import opn from 'opn';
import shelljs from 'shelljs';
import {FunctionSymbol} from '../../antlr/RpsSymTable';
import {Expression} from '../../core/expression';
var robot = require('robotjs');

export class WaitExpression extends Expression{
  static NAME = "wait.";

  constructor(){
    super();
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let period = expr.argument[0];
    return new Promise(function(resolve) {
        setTimeout(resolve, +period*1000);
    });
  }
}

export class CreateExpression extends Expression{
  static NAME = "create.";

  constructor(){
    super();
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let filename = expr.argument[0];
    filename = filename.replace(/"/g , "");
    fs.writeFileSync(filename,'');

    return new Promise(function(resolve) {
      resolve(filename);
    });
  }
}

// export class WriteExpression extends Expression{
//   static NAME = "write.";
//
//   constructor(){
//     super();
//   }
//
//   execute(expr:FunctionSymbol) :Promise<any> {
//     let filename = expr.argument[0];
//     return new Promise(function(resolve) {
//
//     });
//   }
// }

export class OpenExpression extends Expression{
  static NAME = "open.";

  constructor(){
    super();
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let filename = expr.argument[0];
    filename = filename.replace(/"/g , "");

    //workaround for not working on my machine
    if(process.platform === 'linux'){
      shelljs.exec(`xdg-open ${filename}`);
      return Promise.resolve(true);
    }
    else return opn(filename);
  }
}

export class KeywordExpression extends Expression{
  static NAME = "keyword.";

  constructor(){
    super();
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let text = expr.argument[0];
    text = text.replace(/"/g , "");

    robot.typeStringDelayed(text,800);
    robot.keyTap("enter");

    return Promise.resolve(text);
  }
}
