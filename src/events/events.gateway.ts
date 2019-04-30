import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
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

  // afterInit(socket) {
  //   console.log(socket.handshake);
  //   // this.server.emit('testing', { do: 'stuff' });
  // }

  handleConnection(client: Socket) {
    console.log('come', client.id);

    const token = client.handshake.query.token;
    console.log(token);
    if (!token || token !== 'dsc') {
      client.disconnect(true);
    }
    // console.log('jjj', client.disconnect(true));
    // client.disconnect(true);
    // client.broadcast.emit('sysMessage', `${client.id} 进入房间！`);
  }

  handleDisconnect(client: any) {
    console.log('go', client.id);
    const users = this.userService.findAll();
    // console.log(users);
  }

  @SubscribeMessage('login')
  login(client: Socket, data: string): void {
    console.log(77777);
    // console.log(client.broadcast.emit);
    client.emit('login', 'ppppp');
    // this.userService.update(data, client.id);
    // const users = this.userService.findAll();
    // for (const key in users) {
    //   if (users.hasOwnProperty(key)) {
    //     this.server.sockets
    //       .to(users[key])
    //       .emit('sysMessage', `${data} 进入房间！`);
    //   }
    // }
    // console.log(client.server);
    // client.server.emit('sysMessage', `${data} 进入房间！`);
    // return `${data} 进入房间！`;
    // const sockets = this.server.sockets.sockets;
    // // console.log(sockets);
    // // console.log(sockets);
    // Object.keys(sockets).forEach(key => {
    //   // console.log(key);
    //   sockets[key].emit('sysMessage', { hello: 'world' });
    // });

    // return of('123').pipe(map(item => ({ event: 'login', data: item })));
  }

  @SubscribeMessage('message')
  message(client: Socket, data: string): void {
    console.log(data);
    // const users = this.userService.findAll();
    // for (const key in users) {
    //   if (users.hasOwnProperty(key)) {
    //     this.server.sockets.to(users[key]).emit('message', data[0]);
    //   }
    // }
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
}
