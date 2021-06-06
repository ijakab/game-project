import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GameType } from './enum/game-type.enum';
import { FieldValue } from './enum/field-value.enum';
import { GameState } from './types';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: GameType;

  @Column()
  play_as: FieldValue;

  @Column({ type: 'jsonb', nullable: true })
  state: GameState;

  @Column()
  player_one: string;

  @Column({ nullable: true })
  player_two: string;

  @Column({ nullable: true, default: false })
  is_over: boolean;

  @Column({ nullable: true })
  won_by: FieldValue;
}
