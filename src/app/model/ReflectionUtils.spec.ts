import {ReflectionUtils} from './ReflectionUtils';

describe('ReflectionUtils', () => {
  it('should copy object', function() {
    const rawObject = {field1: 'kek', field2: 123, field3: new Date()};
    const rawObjectCopy = ReflectionUtils.getObjectCopy(rawObject);
    expect(rawObject).toEqual(rawObjectCopy);
  });

  it('should copy with type cast', function() {
    const rawObject = {field1: 'kek', field2: 123, field3: new Date()};
    const testModelCopy: TestModel = ReflectionUtils.getInstanceFromRawObject(rawObject, TestModel);
    expect(testModelCopy.getValuesAsObject()).toEqual(rawObject);
  });
});

class TestModel {
  constructor(
    public field1?: string,
    public field2?: number,
    public field3?: Date) {
  }

  public getValuesAsObject() {
    return {field1: this.field1, field2: this.field2, field3: this.field3};
  }
}
