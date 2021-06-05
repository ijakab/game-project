import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameDto {
  @Field()
  id: string;
  @Field()
  test: string;
}
