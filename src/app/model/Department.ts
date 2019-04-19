import {User} from './User';
import {BasicDocument} from './BasicDocument';

export class Department extends BasicDocument {
  constructor(public id?: string,
              public manager?: User,
              public name?: string,
              public description?: string) {
    super();
  }
}
