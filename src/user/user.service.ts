import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toReponseObject(false));
  }
  async login(data: UserDTO) {
    try {
      const { username, password } = data;
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user || (await user.comparePassword(password)))
        throw new HttpException(
          'Invalid username/password',
          HttpStatus.BAD_REQUEST,
        );
      return user.toReponseObject();
    } catch (err) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async register(data: UserDTO) {
    try {
      const { username } = data;
      let user = await this.userRepository.findOne({ where: { username } });
      if (user)
        throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.toReponseObject();
    } catch (err) {
      throw new HttpException('Invalid Data', HttpStatus.BAD_REQUEST);
    }
  }
}
