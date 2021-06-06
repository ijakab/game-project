import { Injectable } from '@nestjs/common';
import { ReadGameDto } from './dto/read-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { Repository } from 'typeorm';
import { Game } from './logic/game';
import { SaveGameDto } from './dto/save-game.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

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
}
