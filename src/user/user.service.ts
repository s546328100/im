import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = {};

  login(name: string) {
    this.users[name] = '';
    return name;
  }

  update(name: string, socketId = '') {
    this.users[name] = socketId;
    return { name, socketId };
  }

  findAll() {
    return this.users;
  }
}
