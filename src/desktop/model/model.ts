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
