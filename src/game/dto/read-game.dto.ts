import { Field, ObjectType } from '@nestjs/graphql';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { GraphQLObjectType, GraphQLString } from 'graphql';

@ObjectType()
export class ReadGameDto {
  @Field()
  id: string;

  @Field()
  type: GameType;

  @Field()
  play_as: FieldValue;

  @Field((type) => [[GraphQLString]])
  state: FieldValue[][];
}
