import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
    nullable: false,
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    name: 'is_verify',
    nullable: false,
    default: () => 'false',
  })
  is_verify: boolean;

  @Column({
    type: 'boolean',
    name: 'is_active',
    nullable: false,
    default: () => 'false',
  })
  is_active: boolean;

  @Column({
    type: 'integer',
    name: 'code',
    nullable: true,
    comment: '4 digit code for email confirmation',
  })
  code?: number | null;

  @CreateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
