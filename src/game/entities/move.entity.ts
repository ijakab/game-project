import {
  Column,
  CreateDateColumn, Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldValue } from '../enum/field-value.enum';
import { GameEntity } from './game.entity';
import { SaveGameCoordinatesDto } from '../dto/save-game-coordinates.dto';

@Entity()
export class MoveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  player: string;

  @Column()
  value: FieldValue;

  @Column({ type: 'jsonb' })
  coordinates: SaveGameCoordinatesDto;

  @Column()
  gameId: string;

  @ManyToOne((type) => GameEntity, (game) => game.moves, {
    onDelete: 'CASCADE',
  })
  game: GameEntity;

  @CreateDateColumn()
  created_at: Date;
}
