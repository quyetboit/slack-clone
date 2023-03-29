export interface Condition {
  fieldName: string,
  operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in',
  compareValue: unknown,
}
