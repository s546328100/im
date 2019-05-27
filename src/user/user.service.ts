import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = {
    sss: {
      avatar: '//robohash.org/DRS.png?set=set1&size=150x150',
      socketId: '',
      state: 0,
    },
    pop: {
      avatar: '//robohash.org/37S.png?set=set1&size=150x150',
      socketId: '',
      state: 0,
    },
    dsc: {
      avatar: '//robohash.org/K5V.png?set=set2&size=150x150',
      socketId: '',
      state: 0,
    },
  };

  // public avatars = [
  //   '//robohash.org/DRS.png?set=set1&size=150x150',
  //   '//robohash.org/37S.png?set=set1&size=150x150',
  //   '//robohash.org/K5V.png?set=set2&size=150x150',
  //   '//robohash.org/1M9.png?set=set2&size=150x150',
  //   '//robohash.org/8WI.png?set=set1&size=150x150',
  //   '//robohash.org/VLO.png?set=set1&size=150x150',
  //   '//robohash.org/BE1.png?set=set2&size=150x150',
  // ];

  login(name: string) {
    if (!this.users[name]) {
      return { code: 404 };
    }
    this.users[name].state = 1;
    return { code: 0, user: this.users[name] };
  }

  update(name: string, socketId = '') {
    this.users[name] = socketId;
    return { name, socketId };
  }

  findAll() {
    return this.users;
  }

  get(name: string) {
    return this.users[name];
  }
}
