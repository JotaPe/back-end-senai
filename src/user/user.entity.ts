import { WarningEntity } from './../warning/warning.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { ExerciseEntity } from './../exercise/exercise.entity';
import { UserRO } from './user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  cpf: string;

  @Column('text')
  rg: string;

  @Column('text')
  gender: string;

  @Column('text')
  neighborhood: string;

  @Column('text')
  city: string;

  @Column('text')
  federativeUnity: string;

  @Column('text')
  phoneNumber: string;

  @OneToMany((type) => ExerciseEntity, (exercise) => exercise.author, {
    cascade: true,
    nullable: true,
  })
  exercises: ExerciseEntity[];

  @ManyToOne((type) => WarningEntity, (warning) => warning.receiver)
  receivedWarnings: WarningEntity[];

  @ManyToOne((type) => WarningEntity, (warning) => warning.author)
  authorWarnings: WarningEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const {
      id,
      createdAt,
      username,
      token,
      name,
      cpf,
      rg,
      gender,
      neighborhood,
      city,
      federativeUnity,
      phoneNumber,
      receivedWarnings,
      authorWarnings,
    } = this;
    const responseObject: UserRO = {
      id,
      createdAt,
      username,
      name,
      cpf,
      rg,
      gender,
      neighborhood,
      city,
      federativeUnity,
      phoneNumber,
      receivedWarnings,
      authorWarnings,
    };

    if (showToken) responseObject.token = token;

    return responseObject;
  }

  private get token(): string {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
