import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  test: string;
}
