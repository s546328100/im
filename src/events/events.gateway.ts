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
    if (!token || !this.userService.get(token)) {
      return client.disconnect(true);
    }
    this.userService.updateSocket(token, client.id);
    client.broadcast.emit('message', {
      content: token + ' 加人了群聊',
      type: 'sys',
      new: 1,
    });
    console.log(this.userService.getSockets());
  }

  handleDisconnect(client: any) {
    console.log('go', client.id);
    const user = this.userService.delSocket(client.id);
    this.userService.update(user, { state: 0 });
    client.broadcast.emit('message', {
      content: user + ' 离开了群聊',
      type: 'sys',
      new: -1,
    });
    console.log(this.userService.findAll());
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
  message(client: Socket, data: any[]): Observable<WsResponse<any>> {
    const user = this.userService.getUserBySocket(client.id);
    client.broadcast.emit('message', {
      avatar: user.avatar,
      name: user.name,
      content: data[0],
      time: Date.now(),
      me: false,
      type: 'user',
    });
    return of(data).pipe(
      map(item => ({
        event: 'message',
        data: {
          avatar: user.avatar,
          name: user.name,
          content: item[0],
          time: Date.now(),
          me: true,
          type: 'user',
        },
      })),
    );
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
