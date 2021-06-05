import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [],
  providers: [GameResolver, GameService],
})
export class GameModule {}
