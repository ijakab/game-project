import { GameState } from '../types';
import { FieldValue } from '../enum/field-value.enum';
import { cloneDeep } from 'lodash';
import { SaveGameCoordinatesDto } from '../dto/save-game-coordinates.dto';
import { gameUtils } from '../utils';

export class GameStateHandler {
  public turnOf: FieldValue;
  public isOver = false;
  public wonBy: FieldValue = null;
  private counter = {
    [FieldValue.O]: 0,
    [FieldValue.X]: 0,
  };

  constructor(private state: GameState) {
    for (const value of this.iterateOverState()) {
      this.counter[value]++;
    }
    this.turnOf =
      this.counter[FieldValue.X] <= this.counter[FieldValue.O]
        ? FieldValue.X
        : FieldValue.O;
  }

  static getEmpty() {
    return new GameStateHandler([
      [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
      [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
      [FieldValue.Empty, FieldValue.Empty, FieldValue.Empty],
    ]);
  }

  static getLoaded(state: GameState) {
    const clone = cloneDeep(state);
    return new GameStateHandler(clone);
  }

  public getState() {
    return cloneDeep(this.state);
  }

  public setValue(coordinates: SaveGameCoordinatesDto, value: FieldValue) {
    this.state[coordinates.row][coordinates.col] = value;
    this.counter[this.turnOf]++;

    if (this.isWinningMove(coordinates, value)) {
      this.isOver = true;
      this.wonBy = value;
    } else if (this.isFull()) {
      this.isOver = true;
    }
    this.turnOf = gameUtils.toggleFieldValue(this.turnOf);
  }

  public getValue(coordinates: SaveGameCoordinatesDto) {
    return this.state[coordinates.row][coordinates.col];
  }

  public isFull() {
    for (const val of this.iterateOverState()) {
      if (!val) return false;
    }
    return true;
  }

  public isWinningMove(coordinates: SaveGameCoordinatesDto, side: FieldValue): boolean {
    const valuesInRow = this.state[coordinates.row].filter((v) => v === side);
    const valuesInCol = this.state.map((row) => row[coordinates.col]).filter(v => v === side);
    if (valuesInRow.length === this.state.length || valuesInCol.length === this.state.length) return true;
    if (coordinates.row === coordinates.col) {
      let diagonalOne = true, diagonalTwo = true;
      for (let i = 0; i < this.state.length; i++) {
        if (this.state[i][i] !== side) diagonalOne = false;
        if (this.state[i][this.state.length - i - 1] !== side) diagonalTwo = false;
      }
      if (diagonalOne || diagonalTwo) return true;
    }
    return false;
  }

  private *iterateOverState() {
    for (const row of this.state) {
      for (const col of row) {
        yield col;
      }
    }
  }
}
