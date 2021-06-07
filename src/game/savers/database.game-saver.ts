import { GameSaver } from './game-saver.interface';
import { ReadGameDto } from '../dto/read-game.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { MoveEntity } from '../entities/move.entity';
import { ReadMoveDto } from '../dto/read-move.dto';

@Injectable()
export class DatabaseGameSaver implements GameSaver {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(MoveEntity)
    private moveRepository: Repository<MoveEntity>,
  ) {}

  async saveGame(data: Partial<ReadGameDto>): Promise<ReadGameDto> {
    if (data.id) return await this.gameRepository.save(data);
    else {
      const game = await this.gameRepository.create(data);
      return await this.gameRepository.save(game);
    }
  }

  async saveMove(move: ReadMoveDto): Promise<ReadMoveDto> {
    const moveEntity = await this.moveRepository.create(move);
    await this.moveRepository.save(moveEntity);
    return move;
  }

  async fetchGame(id: string): Promise<ReadGameDto> {
    return this.gameRepository.findOne({ id });
  }
}
