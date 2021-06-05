import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReadGameDto } from './dto/read-game.dto';
import { GameService } from './game.service';
import { FieldValue } from './enum/field-value.enum';
import { GameType } from './enum/game-type.enum';
import { GameLogic } from './logic/game-logic';
import { SaveGameDto } from './dto/save-game.dto';

@Resolver((of) => ReadGameDto)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query((returns) => ReadGameDto)
  getGame(@Args('id') id: string): ReadGameDto {
    return {
      id: 'test',
      play_as: FieldValue.O,
      type: GameType.Multi,
      state: [],
    };
  }

  @Mutation((returns) => ReadGameDto)
  async initGame(
    @Args({ name: 'config', type: () => SaveGameDto }) dto: ReadGameDto,
  ): Promise<ReadGameDto> {
    return this.gameService.initGame(dto);
  }
}
