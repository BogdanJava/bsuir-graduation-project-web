export class ReflectionUtils {
  public static getObjectCopy(object) {
    const copy = Object.create(object);
    Object.entries(object).forEach(fieldValuePair => {
      const fieldName = fieldValuePair[0];
      copy[fieldName] = object[fieldName];
    });
    return copy;
  }


  public static getInstanceFromRawObject<T>(rawObject: any, type: { new(): T }): T {
    const obj = new type();
    for (let key of Object.keys(rawObject)) {
      obj[key] = rawObject[key];
    }
    return obj;
  }
}
