import {Department} from './Department';

export class UserPublicInfo {
  constructor(public id: string,
              public username: string,
              public photoUrl: string) {
  }
}

export class User {
  constructor(public id: string,
              public username: string,
              public photoUrl?: string,
              public realName?: string,
              public birthday?: Date | number,
              public address?: string,
              public department?: Department) {
  }
}

export class UpdateUserDTO {
  constructor(public realName?: string,
              public birthday?: Date | number,
              public address?: string,
              public department?: Department,
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
