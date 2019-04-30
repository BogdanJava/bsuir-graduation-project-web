export class WorktimeRequest {
  constructor(public id?: string,
              public userId?: string,
              public startDate?: Date,
              public endDate?: Date,
              public description?: string,
              public projectId?: string,
              public approverId?: string,
              public approved?: boolean) {}
}
