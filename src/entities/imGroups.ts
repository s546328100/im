import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('im_groups')
export class ImGroups {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'member_id',
  })
  member_id: number;

  @Column('varchar', {
    nullable: false,
    length: 32,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 12,
    name: 'number',
  })
  number: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'logo',
  })
  logo: string;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'type',
  })
  type: number;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'description',
  })
  description: string;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'invite_type',
  })
  invite_type: number;

  @Column('tinyint', {
    nullable: false,
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

  @Column('int', {
    nullable: false,
    default: () => '0',
    name: 'optimistic_lock',
  })
  optimistic_lock: number;

  @Column('tinyint', {
    nullable: false,
    default: () => '0',
    name: 'join_type',
  })
  join_type: number;
}
