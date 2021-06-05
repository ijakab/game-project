import { FieldValue } from '../enum/field-value.enum';

export class GameLogic {
  getEmptyState(): FieldValue[][] {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }
}
