import {BasicDocument} from './BasicDocument';

export class TimeRequest extends BasicDocument {
  constructor(public id?: string,
              public userId?: string,
              public type?: RequestType,
              public startDate?: Date,
              public endDate?: Date,
              public description?: string,
              public status?: RequestStatus,
              public approverId?: string) {
    super();
  }

  public isPending(): boolean {
    return this.status == RequestStatus.Pending;
  }

  public isApproved(): boolean {
    return this.status == RequestStatus.Approved;
  }

  public isDeclined(): boolean {
    return this.status == RequestStatus.Declined;
  }

  public static getRequestTypeText(type: string): string {
    let typeString;
    switch (type) {
      case 'BUSINESS_LEAVE':
        typeString = 'Business leave';
        break;
      case 'VACATION':
        typeString = 'Vacation';
        break;
      case 'UNPAID':
        typeString = 'Unpaid';
        break;
      case 'TIME_SHIFT':
        typeString = 'Time shift';
        break;
      case 'ILLNESS':
        typeString = 'Illness';
        break;
      default:
        typeString = '';
    }
    return typeString;
  }
}

export enum RequestStatus {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export enum RequestType {
  BUSINESS_LEAVE = 'BUSINESS_LEAVE',
  VACATION = 'VACATION',
  UNPAID = 'UNPAID',
  TIME_SHIFT = 'TIME_SHIFT',
  ILLNESS = 'ILLNESS',
}
