import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('user')
export class UserController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  private users = [];

  @Post('login')
  login(@Body() param: any) {
    // const server = this.eventsGateway.server;
    // const sockets = server.sockets.sockets;
    // // console.log(sockets);
    // Object.keys(sockets).forEach(key => {
    //   console.log(key);
    //   sockets[key].emit('events', { hello: 'world' });
    // });
    console.log(param);
    this.users.push({ name: param.name, socket: '' });
    return this.users;
  }
}
