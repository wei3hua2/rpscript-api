import _ from 'lodash';
import fs from 'fs';
import {TaguiCoreEngine} from '../engines/core-engine';

export class EngineUtil {

  static async getEngineList() {
      let engines:TaguiCoreEngine[] = [];
      let folders = this.readPluginFolders();

      for (var val in folders) {
        let EngineObj = await import(`../engines/${folders[val]}/engine`);
        let Engine = Object.values(EngineObj)[0];

        engines.push( new Engine() );
      }

      return engines;
  }

  static async getEngine(engine:string){
    let EngineObj = await import(`../engines/${engine}/engine`);
    let Engine = Object.values(EngineObj)[0];

    return new Engine();
  }

  private static readPluginFolders () : string[] {
    let folders = fs.readdirSync('./src/engines');
    return _.filter(folders, f => !f.includes('.') && f !== 'core');
  }

}
