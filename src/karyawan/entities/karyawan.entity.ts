import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('karyawan')
export class KaryawanEntity {
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
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'phone',
    nullable: true,
    length: 15,
  })
  phone: string;

  @Column({
    type: 'text',
    name: 'alamat',
    nullable: true,
  })
  alamat: string;

  @Column({
    type: 'varchar',
    name: 'kota',
    nullable: false,
  })
  kota: string;

  @Column({
    type: 'date',
    name: 'tanggal_lahir',
    nullable: true,
  })
  tanggal_lahir: Date;

  @Column({
    type: 'enum',
    name: 'jenis_kelamin',
    nullable: false,
    enum: ['Laki-laki', 'Perempuan'],
    default: 'Laki-laki',
  })
  jenis_kelamin: string;

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
