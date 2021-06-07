import { ReadGameDto } from '../dto/read-game.dto';
import { ReadMoveDto } from '../dto/read-move.dto';
import { MoveEntity } from '../entities/move.entity';

export interface GameSaver {
  saveGame(data: Partial<ReadGameDto>): Promise<ReadGameDto>;

  saveMove(data: Partial<ReadMoveDto>): Promise<ReadMoveDto>;

  fetchGame(id: string): Promise<ReadGameDto>;

  fetchMoves(gameId: string): Promise<MoveEntity[]>;
}
