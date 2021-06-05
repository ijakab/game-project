import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { Repository } from 'typeorm';

@Controller('game')
export class GameController {
  constructor(
    @InjectRepository(GameEntity)
    private _gameRepository: Repository<GameEntity>,
  ) {}

  @Get()
  async test(): Promise<any> {
    const game = await this._gameRepository.create({ test: 'bla' });
    await this._gameRepository.save(game);
    return game;
  }
}
