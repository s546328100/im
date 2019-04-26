import { Controller, Get } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('user')
export class UserController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Get()
  async a(): Promise<any> {
    const server = this.eventsGateway.server;
    const sockets = server.sockets.sockets;
    // console.log(sockets);
    Object.keys(sockets).forEach(key => {
      console.log(key);
      sockets[key].emit('events', { hello: 'world' });
    });
    return 'hello';
  }
}
