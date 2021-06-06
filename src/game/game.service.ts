import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ReadGameDto } from './dto/read-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { Repository } from 'typeorm';
import { Game } from './logic/game';
import { SaveGameDto } from './dto/save-game.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GameType } from './enum/game-type.enum';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  async initGame(dto: SaveGameDto, player: string): Promise<ReadGameDto> {
    // Validation does not get applied on graphql, so calling it manually
    // There is probably a better way of validating, integrated to graphql (directives etc)
    // Used this to save some time for now. Also, this throws 500 error, should create a wrapper around it... But this is not a correct way anyway
    const transformedDto = await plainToClass(SaveGameDto, dto);
    await validateOrReject(transformedDto);

    const config = {
      ...dto,
      player_one: player,
    };
    const game = Game.getEmptyGame(config);
    game.makeMoveIfNeeded();

    const gameEntity = await this.gameRepository.create({
      ...config,
      state: game.getState(),
    });
    await this.gameRepository.save(gameEntity);
    return gameEntity;
  }

  async joinGame(gameId: string, player: string): Promise<ReadGameDto> {
    const game = await this.gameRepository.findOne({ id: gameId });

    // these error handlers could be made to translate error messages
    if (!game) throw new NotFoundException({ gameId }, `error.gameExists`);
    if (game.type === GameType.Single)
      throw new ForbiddenException({ gameId }, 'error.singlePlayers');
    if (game.player_two)
      throw new ForbiddenException({ gameId }, 'error.alreadyJoined');

    game.player_two = player;
    await this.gameRepository.save(game);
    return game;
  }
}
