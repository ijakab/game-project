import { FieldValue } from './enum/field-value.enum';
import { ReadGameDto } from './dto/read-game.dto';
import { ReadMoveDto } from './dto/read-move.dto';

export type GameState = FieldValue[][];

export type GameConfig = Pick<ReadGameDto, 'type' | 'play_as'>;

export type MinimalMove = Pick<ReadMoveDto, 'coordinates' | 'value'>;
