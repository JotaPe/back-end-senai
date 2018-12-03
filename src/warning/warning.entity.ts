import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WarningEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}