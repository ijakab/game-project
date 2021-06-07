import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadGameCoordinatesDto {
  @Field()
  row: number;

  @Field()
  col: number;
}
