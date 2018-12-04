import { WarningDTO, WarningRO } from './warning.dto';
import { UserEntity } from './../user/user.entity';
import { WarningEntity } from './warning.entity';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WarningService {
  constructor(
    @InjectRepository(WarningEntity)
    private warningReposity: Repository<WarningEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private warningToReponseObject(warning: WarningEntity): WarningRO {
    const responseObject: any = {
      ...warning,
      author: warning.author ? warning.author.toResponseObject(false) : null,
    };
    return responseObject;
  }

  private ensureOwnership(warning: WarningEntity, userId: string) {
    if (warning.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(page: number = 1): Promise<WarningRO[]> {
    const warnings = await this.warningReposity.find({
      relations: ['author'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return warnings.map(warning => this.warningToReponseObject(warning));
  }

  async read(id: string): Promise<WarningRO> {
    const warning = await this.warningReposity.findOne({ where: { id } });
    if (!warning) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.warningToReponseObject(warning);
  }

  async create(userId: string, data: WarningDTO): Promise<WarningRO> {
    const user = await this.userRepository.findOne({ where: { userId } });
    const warning = await this.warningReposity.create({
      ...data,
      author: user,
    });
    await this.warningReposity.save(warning);
    return this.warningToReponseObject(warning);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<WarningDTO>,
  ): Promise<WarningRO> {
    const warning = await this.warningReposity.findOne({
      where: { id },
      relations: ['author'],
    });
    Logger.log(`Warning ${warning}`, 'Warning');
    if (!warning) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.warningReposity.remove(warning);
    return this.warningToReponseObject(warning);
  }

  async destroy(id: string, userId: string): Promise<WarningRO> {
    const warning = await this.warningReposity.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!warning) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    this.ensureOwnership(warning, userId);
    await this.warningReposity.remove(warning);
    return this.warningToReponseObject(warning);
  }
}
