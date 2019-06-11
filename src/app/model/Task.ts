import {TaskStatus} from './TaskStatus';
import {BasicDocument} from './BasicDocument';
import {User} from './User';

export class Task extends BasicDocument {
  constructor(public assigneeId?: string,
              public description?: string,
              public deadline?: Date,
              public status?: TaskStatus,
              public name?: string,
              public assignPerson?: User) {
    super(null, null);
  }
}
