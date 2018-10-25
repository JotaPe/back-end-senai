import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(@InjectConfig() private readonly config) {
        this.config = config;
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.config.get('typeorm.type'), 
            host: this.config.get('typeorm.HOST'),
            port: this.config.get('typeorm.PORT'),
            username: this.config.get('typeorm.username'),
            password: this.config.get('typeorm.password'),
            database: this.config.get('typeorm.database'),
            entities: [this.config.get('typeorm.entitites')] || [__dirname + '/**/*.entity{.ts,.js}']
        }
    }
}
