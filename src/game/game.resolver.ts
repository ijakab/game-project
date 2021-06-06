import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ReadGameDto } from './dto/read-game.dto';
import { GameService } from './game.service';
import { FieldValue } from './enum/field-value.enum';
import { GameType } from './enum/game-type.enum';
import { SaveGameDto } from './dto/save-game.dto';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLString } from 'graphql';

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
    @Args({ name: 'config', type: () => SaveGameDto }) dto: ReadGameDto,
    @Args({ name: 'player', type: () => GraphQLString }) player: string,
  ): Promise<ReadGameDto> {
    const res = await this.gameService.initGame(dto, player);
    await pubSub.publish('gameInitialized', { gameInitialized: res });
    console.log(res);
    return res;
  }

  @Subscription((returns) => ReadGameDto, {
    name: 'gameInitialized',
    filter: (payload, variables) => {
      return payload.gameInitialized.id === variables.id;
    },
  })
  gameInitialized(@Args('id') id: string) {
    return pubSub.asyncIterator('gameInitialized');
  }
}
