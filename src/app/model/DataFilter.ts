export class DataFilter {
  private filterList: Array<FilterEntry>;

  constructor() {
    this.filterList = new Array<FilterEntry>();
  }

  getFilterList() {
    return Array.from(this.filterList);
  }

  add(entry: FilterEntry) {
    let found = this.filterList.find(e => e.field == entry.field);
    if (found) {
      this.remove(found);
    }
    this.filterList.push(entry);
  }

  clear() {
    this.filterList = new Array<FilterEntry>();
  }

  toQueryObject(): object {
    const filter = {};
    this.filterList.forEach(entry => {
      filter[entry.field] = {operator: entry.operator.toString(), value: entry.value};
    });
    return filter;
  }

  remove(entry: FilterEntry) {
    const index = this.filterList.indexOf(entry);
    if (index > -1) {
      this.filterList.splice(index, 1);
    }
  }
}

export class FilterEntry {
  constructor(public field: string,
              public operator: Operator,
              public value: any) {
  }

}

export enum Operator {
  EQ = 'EQ', IN = 'IN', GT = 'GT', LT = 'LT', GTE = 'GTE', LTE = 'LTE'
}

export function operatorName(operator: Operator) {
  let stringValue;
  switch (operator) {
    case Operator.EQ:
      stringValue = 'equals';
      break;
    case Operator.IN:
      stringValue = 'in';
      break;
    case Operator.GT:
      stringValue = 'greater than';
      break;
    case Operator.LT:
      stringValue = 'less than';
      break;
    case Operator.GTE:
      stringValue = 'greater than or equals';
      break;
    case Operator.LTE:
      stringValue = 'less than or equals';
      break;
    default:
      stringValue = '';
  }
  return stringValue;
}
