import { GameState } from '../../types';
import { FieldValue } from '../../enum/field-value.enum';
import { GameCoordinatesDto } from '../../dto/game-coordinates.dto';

export interface AI {
  getMove(state: GameState, playAs: FieldValue): GameCoordinatesDto;
}
