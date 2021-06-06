import { GameCoordinates, GameState } from '../../types';
import { FieldValue } from '../../enum/field-value.enum';

export interface AI {
  getMove(state: GameState, playAs: FieldValue): GameCoordinates;
}
