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
  user(@Query() param: any) {
    return this.service.get(param.name);
  }

  @Get('/count')
  userCount() {
    return this.service.getCurrUserCount();
  }

  @Get('/all')
  userAll() {
    return this.service.getCurrUserAll();
  }
}
