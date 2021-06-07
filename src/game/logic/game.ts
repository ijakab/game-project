import { GameConfig, GameState, MinimalMove } from '../types';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { AI } from './ai/ai.interface';
import { RandomAi } from './ai/random.ai';
import { SaveGameCoordinatesDto } from '../dto/save-game-coordinates.dto';
import { ForbiddenException } from '@nestjs/common';
import { gameUtils } from '../utils';
import { GameStateHandler } from './game-state-handler';
import { ReadMoveDto } from '../dto/read-move.dto';

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

  public makeMoveIfNeeded(): MinimalMove {
    if (this.stateHandler.isOver) return null;
    if (this.gamePlaysAs !== this.stateHandler.turnOf) return null;
    return this.makeMove();
  }

  public makeMove(): MinimalMove {
    const coordinates = this.ai.getMove(
      this.stateHandler.getState(),
      this.gamePlaysAs,
    );
    this.stateHandler.setValue(coordinates, this.gamePlaysAs);
    return {
      coordinates,
      value: this.gamePlaysAs,
    };
  }

  public playerMove(
    side: FieldValue,
    coordinates: SaveGameCoordinatesDto,
  ): MinimalMove {
    if (this.stateHandler.isOver) throw new ForbiddenException({ message: 'error.gameOver' });
    if (side !== this.stateHandler.turnOf)
      throw new ForbiddenException({ message: 'error.notYourTurn' });
    const currentValue = this.stateHandler.getValue(coordinates);
    if (currentValue !== FieldValue.Empty)
      throw new ForbiddenException({ message: 'error.invalidCoordinates' });

    this.stateHandler.setValue(coordinates, side);

    return {
      coordinates,
      value: side,
    };
  }

  public wonBy(): FieldValue {
    return this.stateHandler.wonBy;
  }

  public isOver(): boolean {
    return this.stateHandler.isOver;
  }
}
