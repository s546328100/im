import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Members {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'username',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    length: 128,
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 191,
    name: 'avatar',
  })
  avatar: string;

  @Column('tinyint', {
    nullable: false,
    width: 1,
    default: () => '0',
    name: 'status',
  })
  status: number;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;
}
