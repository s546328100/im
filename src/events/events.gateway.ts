import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/user/user.service';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private list = [];

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('login')
  login(client: Socket, data: string): void {
    this.userService.update(data, client.id);
    const users = this.userService.findAll();
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        this.server.sockets.to(users[key]).emit('message', `${data} 进入房间！`);
      }
    }
  }

  @SubscribeMessage('events')
  findAll(client: Socket, data: any): Observable<WsResponse<number>> {
    // tslint:disable-next-line: no-console
    console.log(client.id);
    // tslint:disable-next-line: no-console
    // console.log(client);
    // client.broadcast.emit('newMessage', 12333);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    return data;
  }
}
