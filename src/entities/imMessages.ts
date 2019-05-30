import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('im_messages')
export class ImMessages {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'from_member_id',
  })
  from_member_id: number;

  @Column('int', {
    nullable: false,
    default: () => '0',
    name: 'to_member_id',
  })
  to_member_id: number;

  @Column('int', {
    nullable: false,
    default: () => '0',
    name: 'to_group_id',
  })
  to_group_id: number;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'type',
  })
  type: number;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'msg_type',
  })
  msg_type: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'md5',
  })
  md5: string;

  @Column('varchar', {
    nullable: false,
    length: 10240,
    name: 'content',
  })
  content: string;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'msg_at',
  })
  msg_at: Date;

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
