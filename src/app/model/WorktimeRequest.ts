import {BasicDocument} from './BasicDocument';
import {RequestStatus} from './TimeRequest';

export class WorktimeRequest extends BasicDocument {
  constructor(public id?: string,
              public userId?: string,
              public startDate?: Date,
              public endDate?: Date,
              public hours?: number,
              public description?: string,
              public projectId?: string,
              public approverId?: string,
              public status?: RequestStatus) {
    super();
  }

  public isPending(): boolean {
    return this.status == RequestStatus.Pending;
  }
}
