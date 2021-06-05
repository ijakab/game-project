import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GameType } from './enum/game-type.enum';
import { FieldValue } from './enum/field-value.enum';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: GameType;

  @Column()
  play_as: FieldValue;

  @Column({ type: 'jsonb', nullable: true })
  state: FieldValue[][];
}
