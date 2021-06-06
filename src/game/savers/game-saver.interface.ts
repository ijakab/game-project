import { ReadGameDto } from '../dto/read-game.dto';

export interface GameSaver {
  saveGame(data: Partial<ReadGameDto>): Promise<ReadGameDto>;

  fetchGame(id: string): Promise<ReadGameDto>;
}