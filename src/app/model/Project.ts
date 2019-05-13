import {BasicDocument} from './BasicDocument';

export class Project extends BasicDocument {
  constructor(public id?: string,
              public name?: string,
              public assignedPersonsIds?: string[],
              public description?: string,
              public photoUrl?: string) {
    super();
  }
}
