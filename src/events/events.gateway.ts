import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private list = [];

  @SubscribeMessage('login')
  login(client: Socket, data: string): void {
    console.log('sddd');
    this.list.push({id: client.id, name: data});
    client.emit('login', this.list)
    // return from(this.list);
  }

  @SubscribeMessage('events')
  findAll(client: Socket, data: any): Observable<WsResponse<number>> {
    // tslint:disable-next-line: no-console
    console.log(client.id);
    // tslint:disable-next-line: no-console
    // console.log(client);
    client.broadcast.emit('newMessage', 12333);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    return data;
  }
}
