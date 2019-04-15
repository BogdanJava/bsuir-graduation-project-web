import {User} from './User';

export class Department {
  constructor(public id?: string,
              public manager?: User,
              public name?: string,
              public description?: string) {
  }
}
