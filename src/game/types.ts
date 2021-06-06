import { FieldValue } from './enum/field-value.enum';
import { ReadGameDto } from './dto/read-game.dto';

export type GameState = FieldValue[][];

export type GameConfig = Pick<ReadGameDto, 'type' | 'play_as'>;
