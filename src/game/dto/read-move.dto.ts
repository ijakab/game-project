import { Field, ObjectType } from '@nestjs/graphql';
import { FieldValue } from '../enum/field-value.enum';
import { ReadGameCoordinatesDto } from './read-game-coordinates.dto';

@ObjectType()
export class ReadMoveDto {
  @Field()
  id: string;

  @Field({nullable: true})
  player?: string;

  @Field()
  value: FieldValue;

  @Field()
  gameId: string;

  @Field()
  created_at: Date;

  @Field((type) => ReadGameCoordinatesDto)
  coordinates: ReadGameCoordinatesDto;
}
