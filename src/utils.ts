/**
 * Helper funtion to transform an array to dictionary by a certain key.
 * @param arr
 * @param dataKey
 */
export const arrayToDict = (arr: any[], dataKey: string) =>
  arr.reduce((dict, item) => {
    dict[item[dataKey]] = item;
    return dict;
  }, {});
