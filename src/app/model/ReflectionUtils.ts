export class ReflectionUtils {
  public static copyObject(object) {
    const copy = Object.create(object);
    Object.entries(object).forEach(fieldValuePair => {
      const fieldName = fieldValuePair[0];
      copy[fieldName] = object[fieldName];
    });
    return copy;
  }
}
