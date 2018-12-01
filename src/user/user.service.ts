import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async read(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user.toResponseObject(false);
  }

  async showAll(page: number = 1): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      take: 25,
      skip: 25 * (page - 1),
    });
    return users.map((user) => user.toResponseObject(false));
  }

  async login(data: UserDTO): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository
      .findOne({ where: { username } })
      .catch((err) => Logger.error('Exception', 'User Not Found'));
    if (
      !user ||
      !(await user.comparePassword(password).catch((err) => {
        throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
      }))
    ) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
