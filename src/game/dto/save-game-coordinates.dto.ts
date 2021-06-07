import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SaveGameCoordinatesDto {
  @Field()
  row: number;

  @Field()
  col: number;
}
