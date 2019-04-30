import {BasicDocument} from './BasicDocument';

export class TimeRequest extends BasicDocument {
  constructor(public id?: string,
              public userId?: string,
              public type?: RequestType,
              public startDate?: Date,
              public endDate?: Date,
              public description?: string,
              public approved?: boolean,
              public approverId?: string) {
    super();
  }
}

export enum RequestType {
  BUSINESS_LEAVE,
  VACATION,
  UNPAID,
  TIME_SHIFT,
  ILLNESS
}
