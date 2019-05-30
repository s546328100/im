import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('im_friends')
export class ImFriends {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: true,
    name: 'member_id',
  })
  member_id: number | null;

  @Column('int', {
    nullable: true,
    name: 'friend_member_id',
  })
  friend_member_id: number | null;

  @Column('varchar', {
    nullable: true,
    length: 32,
    name: 'nickname',
  })
  nickname: string | null;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'status',
  })
  status: number;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'is_blacklist',
  })
  is_blacklist: number;

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

  @Column('int', {
    nullable: false,
    default: () => '0',
    name: 'optimistic_lock',
  })
  optimistic_lock: number;
}
