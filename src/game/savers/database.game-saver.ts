import { GameSaver } from './game-saver.interface';
import { ReadGameDto } from '../dto/read-game.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '../game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseGameSaver implements GameSaver {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  async saveGame(data: Partial<ReadGameDto>): Promise<ReadGameDto> {
    if (data.id) return await this.gameRepository.save(data);
    else {
      const game = await this.gameRepository.create(data);
      return await this.gameRepository.save(game);
    }
  }

  async fetchGame(id: string): Promise<ReadGameDto> {
    return this.gameRepository.findOne({ id });
  }
}
