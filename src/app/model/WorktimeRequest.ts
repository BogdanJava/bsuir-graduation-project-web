import {BasicDocument} from './BasicDocument';

export class WorktimeRequest extends BasicDocument {
  constructor(public id?: string,
              public userId?: string,
              public startDate?: Date,
              public endDate?: Date,
              public hours?: number,
              public description?: string,
              public projectId?: string,
              public approverId?: string,
              public approved?: boolean) {
    super();
  }
}
