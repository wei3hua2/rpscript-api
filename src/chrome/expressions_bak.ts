import {FunctionSymbol} from '../../antlr/RpsSymTable';
import {Expression} from '../../core/expression';
import {ChromeEngine} from './engine';

export class LaunchExpression extends Expression{
  static NAME = "launch.";
  engine:ChromeEngine;

  constructor(engine:ChromeEngine){
    super();
    this.engine = engine;
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    return this.engine.launch();
  }
}

export class NavigateExpression extends Expression{
  static NAME = "navigate.";
  engine:ChromeEngine;

  constructor(engine:ChromeEngine){
    super();
    this.engine = engine;
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let url = expr.argument[0];
    url = url.replace(/"/g , "");
    return this.engine.navigate(url);
  }
}

export class ShutdownExpression extends Expression{
  static NAME = "shutdown.";
  engine:ChromeEngine;

  constructor(engine:ChromeEngine){
    super();
    this.engine = engine;
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    return this.engine.kill();
  }
}

export class TypeExpression extends Expression{
  static NAME = "type.";
  engine:ChromeEngine;

  constructor(engine:ChromeEngine){
    super();
    this.engine = engine;
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let text = expr.argument[0];
    text = text.replace(/"/g , "");
    return this.engine.type(text);
  }
}

export class ClickExpression extends Expression{
  static NAME = "click.";
  engine:ChromeEngine;

  constructor(engine:ChromeEngine){
    super();
    this.engine = engine;
  }

  execute(expr:FunctionSymbol) :Promise<any> {
    let element = expr.argument[0];
    element = element.replace(/"/g , "");
    return this.engine.click(element);
  }
}
