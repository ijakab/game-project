import { Field, ObjectType } from '@nestjs/graphql';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { GraphQLString } from 'graphql';
import { GameState } from '../types';

@ObjectType()
export class ReadGameDto {
  @Field()
  id: string;

  @Field()
  type: GameType;

  @Field()
  play_as: FieldValue;

  @Field((type) => [[GraphQLString]])
  state: GameState;

  @Field()
  player_one: string;

  @Field({ nullable: true })
  player_two?: string;

  @Field({ nullable: true, defaultValue: false })
  is_over?: boolean;

  @Field({ nullable: true })
  won_by?: FieldValue;
}
