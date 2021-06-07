import { ReadGameDto } from '../dto/read-game.dto';
import { ReadMoveDto } from '../dto/read-move.dto';

export interface GameSaver {
  saveGame(data: Partial<ReadGameDto>): Promise<ReadGameDto>;

  saveMove(data: Partial<ReadMoveDto>): Promise<ReadMoveDto>;

  fetchGame(id: string): Promise<ReadGameDto>;
}
