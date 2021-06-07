import { FieldValue } from './enum/field-value.enum';
import { ReadGameDto } from './dto/read-game.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { GameType } from './enum/game-type.enum';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const gameUtils = {
  toggleFieldValue(original: FieldValue): FieldValue {
    return original === FieldValue.O ? FieldValue.X : FieldValue.O
  },

  canJoinGame(game: ReadGameDto): void {
    // these error handlers could be made to translate error messages
    if (!game) throw new NotFoundException({ message: 'error.gameExists' });
    if (game.type === GameType.Single)
      throw new ForbiddenException({ message: 'error.singlePlayers' });
    if (game.player_two)
      throw new ForbiddenException({ message: 'error.alreadyJoined' });
    if (game.is_over)
      throw new ForbiddenException({ message: 'error.gameOver' });
  },

  getPlayerSide(player: string, game: ReadGameDto) {
    return game.player_one === player
      ? game.play_as
      : game.play_as === FieldValue.O
      ? FieldValue.X
      : FieldValue.O;
  },

  async validateDto(Class: any, obj: any) {
    // Validation does not get applied on graphql, so calling it manually
    // There is probably a better way of validating, integrated to graphql, but could not find in docs exactly what i need
    const transformedDto = await plainToClass(Class, obj);
    await validateOrReject(transformedDto);
  },
};
