import { GameConfig, GameState } from '../types';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { AI } from './ai/ai.interface';
import { RandomAi } from './ai/random.ai';

export class Game {
  private ai: AI = new RandomAi();
  private gamePlaysAs: FieldValue;
  private turnOf: FieldValue;
  private numOfX = 0;
  private numOfO = 0;

  private state: GameState = [
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
  ];

  static getEmptyGame(config: GameConfig) {
    return new Game(config);
  }

  constructor(private config: GameConfig) {
    this.calculateInitialValues();
  }

  private calculateInitialValues() {
    if (this.config.type === GameType.Multi) {
      this.gamePlaysAs = null;
    } else {
      this.gamePlaysAs =
        this.config.play_as === FieldValue.O ? FieldValue.X : FieldValue.O;
    }
    this.iterateOverState((value) => {
      if (value === FieldValue.O) this.numOfO++;
      if (value === FieldValue.X) this.numOfX++;
    });
    this.turnOf = this.numOfX <= this.numOfO ? FieldValue.X : FieldValue.O;
  }

  private iterateOverState(callback) {
    for (const row of this.state) {
      for (const col of this.state) {
        callback(col);
      }
    }
  }

  public getState(): GameState {
    // todo deep clone
    return this.state;
  }

  public makeMoveIfNeeded(): void {
    if (this.gamePlaysAs !== this.turnOf) return;
    this.makeMove();
  }

  public makeMove(): void {
    const position = this.ai.getMove(this.getState(), this.gamePlaysAs);
    this.state[position.row][position.col] = this.gamePlaysAs;
  }
}
