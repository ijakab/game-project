import { Field, InputType } from '@nestjs/graphql';
import { GameType } from '../enum/game-type.enum';
import { FieldValue } from '../enum/field-value.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

@InputType()
export class SaveGameDto {
  @Field()
  @IsNotEmpty()
  @IsEnum(GameType)
  type: GameType;

  @Field()
  @IsNotEmpty()
  @IsEnum(FieldValue)
  play_as: FieldValue;
}
