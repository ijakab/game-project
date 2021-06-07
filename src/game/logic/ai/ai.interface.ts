import { GameState } from '../../types';
import { FieldValue } from '../../enum/field-value.enum';
import { SaveGameCoordinatesDto } from '../../dto/save-game-coordinates.dto';

export interface AI {
  getMove(state: GameState, playAs: FieldValue): SaveGameCoordinatesDto;
}
