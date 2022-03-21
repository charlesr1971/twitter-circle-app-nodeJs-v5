export function arrayInclude(array1: any, array2: any): any {
  const array = array1.filter( (item) => {
    return array2.includes(item);
  });
  return array;
}

export function arrayExclude(array1: any, array2: any): any {
  const array = array1.filter( (item) => {
    return !array2.includes(item);
  });
  return array;
}

export function toObject(arr: any): any {
  const obj = {};
  for (const pair of arr) {
    if (Object(pair) !== pair) {
      throw new TypeError('iterable for fromEntries should yield objects');
    }
    // Consistency with Map: contract is that entry has "0" and "1" keys, not
    // that it is an array or iterable.
    const { 0: key, 1: val } = pair;
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: val,
    });
  }
  return obj;
}
