import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { Repository } from 'typeorm';
import { GameDto } from './game.dto';

@Resolver((of) => GameDto)
export class GameResolver {
  constructor(
    @InjectRepository(GameEntity)
    private _gameRepository: Repository<GameEntity>,
  ) {}

  @Query((returns) => GameDto)
  async getGame(@Args('id') id: string) {
    return this._gameRepository.findOne({
      id: id,
    });
  }
}
