import { GameConfig, GameState } from '../types';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';

export class Game {
  private state: GameState = [
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
  ];

  static getEmptyGame(config: GameConfig) {
    return new Game(config);
  }

  constructor(private config: GameConfig) {}

  public getState(): GameState {
    return this.state;
  }

  public makeMoveIfNeeded(): void {
    if (this.config.type === GameType.Single) return;
  }
}
