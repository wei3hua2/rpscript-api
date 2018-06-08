export class OpenModel {

  filepath:string;
  opts?:OpenOptions;

  constructor(args:string[], opts?:OpenOptions){
    this.filepath = args[0];
    this.filepath = this.filepath.replace(/"/g , "");

    this.opts = opts;
  }
}
export class OpenOptions {}

export class WaitModel {
  period:number;
  opts?:WaitOptions;

  constructor(args:string[], opts?:WaitOptions){
    this.period = +args[0];
    this.opts = opts;
  }
}
export class WaitOptions {}

export class CreateModel {
  filename:string;
  initialContent:string
  opts?:CreateOptions;

  constructor(args:string[], opts?:WaitOptions){
    this.filename = args[0];
    this.initialContent = args[0] ? args[0] : '';
    this.opts = opts;
  }
}
export class CreateOptions {}

export class TypeModel {
  text:string;
  opts?:TypeOptions;

  constructor(args:string[], opts?:TypeOptions){
    this.text = args[0];
    this.opts = opts;
  }
}
export class TypeOptions {
  speed:number = 800;
  constructor(opts?:any){
    if(opts && opts.speed) this.speed = opts.speed;
  }
}
