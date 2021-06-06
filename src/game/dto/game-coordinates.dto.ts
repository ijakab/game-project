import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GameCoordinatesDto {
  @Field()
  row: number;

  @Field()
  col: number;
}
