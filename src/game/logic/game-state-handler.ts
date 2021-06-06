import { GameState } from '../types';
import { FieldValue } from '../enum/field-value.enum';
import { cloneDeep } from 'lodash';
import { GameCoordinatesDto } from '../dto/game-coordinates.dto';
import { gameUtils } from '../utils';

export class GameStateHandler {
  public turnOf: FieldValue;
  private counter = {
    [FieldValue.O]: 0,
    [FieldValue.X]: 0,
  };

  constructor(private state: GameState) {
    this.iterateOverState((value) => {
      if (value !== FieldValue.Empty) {
        this.counter[value]++;
      }
    });
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

  public setValue(coordinates: GameCoordinatesDto, value: FieldValue) {
    this.state[coordinates.row][coordinates.col] = value;
    this.turnOf = gameUtils.toggleFieldValue(this.turnOf);
    this.counter[this.turnOf]++;
  }

  public getValue(coordinates: GameCoordinatesDto) {
    return this.state[coordinates.row][coordinates.col];
  }

  private iterateOverState(callback) {
    for (const row of this.state) {
      for (const col of row) {
        callback(col);
      }
    }
  }
}
