import { Connection, Repository } from 'typeorm';

export const createRepositoryProvider = (
  token: string,
  entity: { new () },
) => ({
  provide: token,
  useFactory: (connection: Connection) => {
    return connection.getRepository(entity.name);
  },
  inject: [Connection],
});
