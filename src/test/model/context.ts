import Mocha from 'mocha';
import {Suite, Runner} from 'mocha';

export class TestContext {
  suite?:Suite;
  mocha?:Mocha;
  runner?:Runner;
}
