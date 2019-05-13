import {Department} from './Department';
import {BasicDocument} from './BasicDocument';

export class UserPublicInfo {
  constructor(public id: string,
              public username: string,
              public photoUrl: string) {
  }
}

export class User extends BasicDocument {
  constructor(public id?: string,
              public username?: string,
              public password?: string,
              public photoUrl?: string,
              public realName?: string,
              public birthday?: Date | number,
              public address?: string,
              public projectIds?: string[],
              public department?: Department,
              public roles?: Role[]) {
    super();
  }


}

export class UpdateUserDTO {
  constructor(public realName?: string,
              public birthday?: Date | number,
              public address?: string,
              public department?: Department,
              public projectIds?: string[],
              public photoUrl?: string) {
  }

  public static fromUser(user: User): UpdateUserDTO {
    const dto = new UpdateUserDTO();
    Object.entries(dto).forEach(fieldValuePair => {
      const fieldName = fieldValuePair[0];
      dto[fieldName] = user[fieldName];
    });
    return dto;
  }
}

export enum Role {
  Admin = "ADMIN", User = "USER", Moderator = "MODERATOR"
}

