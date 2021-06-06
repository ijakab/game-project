import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ReadGameDto } from './dto/read-game.dto';
import { GameService } from './game.service';
import { FieldValue } from './enum/field-value.enum';
import { GameType } from './enum/game-type.enum';
import { SaveGameDto } from './dto/save-game.dto';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLString } from 'graphql';
import { GameCoordinatesDto } from './dto/game-coordinates.dto';

const pubSub = new PubSub();

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
      player_one: 'test1',
      player_two: 'test2',
    };
  }

  @Mutation((returns) => ReadGameDto)
  async initGame(
    @Args({ name: 'config', type: () => SaveGameDto }) dto: SaveGameDto,
    @Args({ name: 'player', type: () => GraphQLString }) player: string,
  ): Promise<ReadGameDto> {
    return this.gameService.initGame(dto, player);
  }

  @Mutation((returns) => ReadGameDto)
  async makeMove(
    @Args({ name: 'coordinates', type: () => GameCoordinatesDto })
    dto: GameCoordinatesDto,
    @Args({ name: 'player', type: () => GraphQLString }) player: string,
  ): Promise<ReadGameDto> {
    return this.gameService.initGame({ play_as: FieldValue.O, type: GameType.Multi }, player);
  }

  @Mutation((returns) => ReadGameDto)
  async joinGame(
    @Args({ name: 'player', type: () => GraphQLString }) player: string,
    @Args({ name: 'game_id', type: () => GraphQLString }) gameId: string,
  ): Promise<ReadGameDto> {
    return this.gameService.joinGame(gameId, player);
  }

  @Subscription((returns) => ReadGameDto, {
    name: 'gameInitialized',
    filter: (payload, variables) => {
      // we should also check that the user is on the game, but no authentication was built anyway
      return payload.gameInitialized.id === variables.id;
    },
  })
  gameInitialized(@Args('id') id: string) {
    return pubSub.asyncIterator('gameInitialized');
  }
}
