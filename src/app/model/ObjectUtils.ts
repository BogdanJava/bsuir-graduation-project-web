export class ObjectUtils {
  static getInstanceFromRawObject<T>(rawObject: any, type: { new(): T }): T {
    const obj = new type();
    for (let key of Object.keys(rawObject)) {
      rawObject[key] = rawObject[key];
    }
    return obj;
  }
}
