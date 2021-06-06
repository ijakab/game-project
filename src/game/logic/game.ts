import { GameConfig, GameState } from '../types';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { AI } from './ai/ai.interface';
import { RandomAi } from './ai/random.ai';
import { GameCoordinatesDto } from '../dto/game-coordinates.dto';
import { ForbiddenException } from '@nestjs/common';
import { gameUtils } from '../utils';

export class Game {
  private ai: AI = new RandomAi();
  private gamePlaysAs: FieldValue;
  private turnOf: FieldValue;
  private counter = {
    [FieldValue.O]: 0,
    [FieldValue.X]: 0,
  };

  private state: GameState = [
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
  ];

  public static getEmptyGame(config: GameConfig): Game {
    const game = new Game(config);
    game.calculateInitialValues();
    return game;
  }

  public static loadGameFromState(config: GameConfig, state: GameState): Game {
    const game = new Game(config);
    game.state = state; // todo deep clone
    game.calculateInitialValues();
    return game;
  }

  constructor(private config: GameConfig) {}

  private calculateInitialValues() {
    if (this.config.type === GameType.Multi) {
      this.gamePlaysAs = null;
    } else {
      this.gamePlaysAs =
        this.config.play_as === FieldValue.O ? FieldValue.X : FieldValue.O;
    }
    this.iterateOverState((value) => {
      if (value !== FieldValue.Empty) {
        this.counter[value]++;
      }
    });
    this.turnOf =
      this.counter[FieldValue.X] <= this.counter[FieldValue.O]
        ? FieldValue.X
        : FieldValue.O;
  }

  private iterateOverState(callback) {
    for (const row of this.state) {
      for (const col of row) {
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

  public playerMove(side: FieldValue, coordinates: GameCoordinatesDto): void {
    if (side !== this.turnOf)
      throw new ForbiddenException({}, 'error.notYourTurn');
    const currentValue = this.state[coordinates.row][coordinates.col];
    if (currentValue !== FieldValue.Empty)
      throw new ForbiddenException({}, 'error.invalidCoordinates');

    this.state[coordinates.row][coordinates.col] = side;
    this.turnOf = gameUtils.toggleFieldValue(this.turnOf);
    this.counter[this.turnOf]++;
  }
}
