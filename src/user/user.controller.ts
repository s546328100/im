import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly service: UserService,
  ) {}

  private users = {};

  @Post('login')
  login(@Body() param: any) {
    return this.service.login(param.name);
  }

  @Get()
  user() {
    const s: string[] = [];
    const server = this.eventsGateway.server;
    const sockets = server.sockets.sockets;
    // console.log(sockets);
    Object.keys(sockets).forEach(key => {
      s.push(key);
      // sockets[key].emit('events', { hello: 'world' });
    });

    return s;
  }
}
