export class User {
    uid?: string;

  username?: string;

  displayName?: string;

  email?: string;

  birthday?: Date;

  password?: string;

  roleId?: string;

  avartarUrl?: string;

  phone?: string;

  status?: string;

  bannedTime?: Date;

  timeOutTime?: Date;

  timeOutType?: string;

  creatorPoint?: number;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
