import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Members } from 'src/entities/members';
import { REPOSITORY_MEMBERS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY_MEMBERS)
    private readonly members: Repository<Members>,
  ) {}

  private users = {
    sss: {
      name: 'sss',
      avatar: '//robohash.org/DRS.png?set=set1&size=150x150',
      state: 0,
    },
    pop: {
      name: 'pop',
      avatar: '//robohash.org/37S.png?set=set1&size=150x150',
      state: 0,
    },
    dsc: {
      name: 'dsc',
      avatar: '//robohash.org/K5V.png?set=set2&size=150x150',
      state: 0,
    },
  };

  private socketUsers = {};

  // public avatars = [
  //   '//robohash.org/DRS.png?set=set1&size=150x150',
  //   '//robohash.org/37S.png?set=set1&size=150x150',
  //   '//robohash.org/K5V.png?set=set2&size=150x150',
  //   '//robohash.org/1M9.png?set=set2&size=150x150',
  //   '//robohash.org/8WI.png?set=set1&size=150x150',
  //   '//robohash.org/VLO.png?set=set1&size=150x150',
  //   '//robohash.org/BE1.png?set=set2&size=150x150',
  // ];

  create(body: any) {
    return this.members.find();
  }

  login(name: string) {
    if (!this.users[name] || this.users[name].state) {
      throw new Error();
    }
    this.users[name].state = 1;
    console.log(this.users[name]);
    return this.users[name];
  }

  update(name: string, data: any) {
    Object.assign(this.users[name], data);
    return true;
  }

  findAll() {
    return this.users;
  }

  get(name: string) {
    return this.users[name];
  }

  updateSocket(name: string, socketId = '') {
    this.socketUsers[socketId] = name;
    return true;
  }

  delSocket(socketId: string) {
    const user = this.socketUsers[socketId];
    delete this.socketUsers[socketId];
    return user;
  }

  getUserBySocket(socketId: string) {
    return this.users[this.socketUsers[socketId]];
  }

  getCurrUserCount() {
    return Object.keys(this.socketUsers).length;
  }

  getSockets() {
    return this.socketUsers;
  }

  getCurrUserAll() {
    const res = [];
    for (const key in this.socketUsers) {
      if (this.socketUsers.hasOwnProperty(key)) {
        const su = this.socketUsers[key];
        res.push(this.users[su]);
      }
    }
    return res;
  }
}
