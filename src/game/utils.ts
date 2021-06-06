import { FieldValue } from './enum/field-value.enum';

export const gameUtils = {
  toggleFieldValue(original: FieldValue) {
    return original === FieldValue.O ? FieldValue.X : FieldValue.O
  },
};
