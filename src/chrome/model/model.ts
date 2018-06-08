export class LaunchModel {
  opts?:LaunchOptions;

  constructor(args:string[], opts?:LaunchOptions){
    this.opts = opts;
  }
}
export class LaunchOptions {}

export class NavigateModel {
  url:string;
  opts?:NavigateOptions;

  constructor(args:string[], opts?:NavigateOptions){
    this.url = args[0];
    this.url = this.url.replace(/"/g , "");
    this.opts = opts;
  }
}
export class NavigateOptions {}

export class TypeModel {
  text:string;
  opts?:TypeOptions;

  constructor(args:string[], opts?:TypeOptions){
    this.text = args[0];
    this.text = this.text.replace(/"/g , "");
    this.opts = opts;
  }
}
export class TypeOptions {}

export class ClickModel {
  element:string;
  opts?:ClickOptions;

  constructor(args:string[], opts?:ClickOptions){
    this.element = args[0];
    this.element = this.element.replace(/"/g , "");
    this.opts = opts;
  }
}
export class ClickOptions {}

export class CloseModel {
  opts?:CloseOptions;

  constructor(args:string[], opts?:CloseOptions){
    this.opts = opts;
  }
}
export class CloseOptions {}
