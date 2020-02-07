// @flow
/**
 * Returns a shallow copy of the array where an item is moved fromIndex toIndex.
 * If changeOriginal is true then the array is updated directly.
 */
export const arrayMoveItem = (
  array: any[],
  fromIndex: number,
  toIndex: number,
  changeOriginal: boolean = false
) => {
  const result: any[] = changeOriginal ? array : [...array];
  if (toIndex >= result.length) {
    // Create empty elements
    let spaces = toIndex - result.length + 1;
    while (spaces) {
      result.push(undefined);
      spaces -= 1;
    }
  }
  result.splice(toIndex, 0, result.splice(fromIndex, 1)[0]);
  return result;
};
