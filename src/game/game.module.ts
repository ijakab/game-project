import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { DatabaseGameSaver } from './savers/database.game-saver';
import { MoveEntity } from './entities/move.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, MoveEntity])],
  controllers: [],
  providers: [GameResolver, GameService, DatabaseGameSaver],
})
export class GameModule {}
