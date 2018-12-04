import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'user/user.entity';

@Entity()
export class WarningEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @ManyToOne((type) => UserEntity, (warnings) => warnings.authorWarnings)
  author: UserEntity;

  @OneToMany((type) => UserEntity, (receiver) => receiver.receivedWarnings)
  receiver: UserEntity[];
}
