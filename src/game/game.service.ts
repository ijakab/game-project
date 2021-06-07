import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ReadGameDto } from './dto/read-game.dto';
import { Game } from './logic/game';
import { SaveGameDto } from './dto/save-game.dto';
import { SaveGameCoordinatesDto } from './dto/save-game-coordinates.dto';
import { DatabaseGameSaver } from './savers/database.game-saver';
import { GameSaver } from './savers/game-saver.interface';
import { ReadMoveDto } from './dto/read-move.dto';
import { gameUtils } from './utils';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GameService {
  private readonly gameSaver: GameSaver;

  constructor(private dbGameSaver: DatabaseGameSaver) {
    this.gameSaver = dbGameSaver;
  }

  async initGame(dto: SaveGameDto, player: string): Promise<ReadGameDto> {
    await gameUtils.validateDto(SaveGameDto, dto)
    const game = Game.getEmptyGame(dto);
    const gameMove = game.makeMoveIfNeeded();
    const gameEntity = await this.gameSaver.saveGame({
      ...dto,
      state: game.getState(),
      player_one: player,
    });
    await this.saveMove(gameMove, gameEntity.id, player)

    return gameEntity;
  }

  async joinGame(gameId: string, player: string): Promise<ReadGameDto> {
    const game = await this.gameSaver.fetchGame(gameId);
    gameUtils.canJoinGame(game);
    game.player_two = player;
    await this.gameSaver.saveGame(game);
    return game;
  }

  async makeMove(
    gameId: string,
    player: string,
    coordinates: SaveGameCoordinatesDto,
  ): Promise<ReadGameDto> {
    const gameEntity = await this.gameSaver.fetchGame(gameId);
    if (gameEntity.player_one !== player && gameEntity.player_two !== player)
      throw new ForbiddenException({ message: 'error.notInTheGame' });
    const playerSide = gameUtils.getPlayerSide(player, gameEntity);

    const game = Game.loadGameFromState(gameEntity, gameEntity.state);
    const playerMove = game.playerMove(playerSide, coordinates);
    await this.saveMove(playerMove, gameId, player);
    const gameMove = game.makeMoveIfNeeded();
    await this.saveMove(gameMove, gameId, player);

    await this.saveGameState(gameEntity, game);
    return gameEntity;
  }

  async getHistory(gameId: string): Promise<ReadMoveDto[]> {
    return this.gameSaver.fetchMoves(gameId);
  }

  private async saveMove(minimalMove, gameId, player): Promise<void> {
    if (minimalMove) {
      await this.gameSaver.saveMove({
        ...minimalMove,
        gameId,
        player,
      });
    }
  }

  private async saveGameState(gameEntity: GameEntity, game: Game) {
    gameEntity.state = game.getState();
    gameEntity.is_over = game.isOver();
    gameEntity.won_by = game.wonBy();
    await this.gameSaver.saveGame(gameEntity);

  }
}
