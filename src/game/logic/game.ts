import { GameConfig, GameState } from '../types';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { AI } from './ai/ai.interface';
import { RandomAi } from './ai/random.ai';
import { GameCoordinatesDto } from '../dto/game-coordinates.dto';
import { ForbiddenException } from '@nestjs/common';
import { gameUtils } from '../utils';
import { GameStateHandler } from './game-state-handler';

export class Game {
  private ai: AI = new RandomAi();
  private gamePlaysAs: FieldValue;

  private stateHandler: GameStateHandler;

  public static getEmptyGame(config: GameConfig): Game {
    const game = new Game(config);
    game.stateHandler = GameStateHandler.getEmpty();
    return game;
  }

  public static loadGameFromState(config: GameConfig, state: GameState): Game {
    const game = new Game(config);
    game.stateHandler = GameStateHandler.getLoaded(state);
    return game;
  }

  constructor(private config: GameConfig) {
    if (config.type === GameType.Multi) {
      this.gamePlaysAs = null;
    } else {
      this.gamePlaysAs = gameUtils.toggleFieldValue(config.play_as);
    }
  }

  public getState(): GameState {
    return this.stateHandler.getState();
  }

  public makeMoveIfNeeded(): void {
    if (this.gamePlaysAs !== this.stateHandler.turnOf) return;
    this.makeMove();
  }

  public makeMove(): void {
    const position = this.ai.getMove(this.stateHandler.getState(), this.gamePlaysAs);
    this.stateHandler.setValue(position, this.gamePlaysAs);
  }

  public playerMove(side: FieldValue, coordinates: GameCoordinatesDto): void {
    if (side !== this.stateHandler.turnOf)
      throw new ForbiddenException({}, 'error.notYourTurn');
    const currentValue = this.stateHandler.getValue(coordinates);
    if (currentValue !== FieldValue.Empty)
      throw new ForbiddenException({}, 'error.invalidCoordinates');

    this.stateHandler.setValue(coordinates, side);
  }
}
