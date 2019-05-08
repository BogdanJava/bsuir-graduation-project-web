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

export enum RequestType {
  BUSINESS_LEAVE,
  VACATION,
  UNPAID,
  TIME_SHIFT,
  ILLNESS
}
