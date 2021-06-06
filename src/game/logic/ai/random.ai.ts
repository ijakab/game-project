import { AI } from './ai.interface';
import { GameCoordinates, GameState } from '../../types';
import { FieldValue } from '../../enum/field-value.enum';

export class RandomAi implements AI {
  public getMove(state: GameState, playAs: FieldValue): GameCoordinates {
    const emptyCombinations: GameCoordinates[] = [];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (!state[i][j]) emptyCombinations.push({ row: i, col: j });
      }
    }

    const randIndex = this.randr(0, emptyCombinations.length - 1);
    return emptyCombinations[randIndex];
  }

  randr(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
