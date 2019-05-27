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
      filter[entry.field] = {operator: entry.operator.toString(), value: entry.value, type: entry.type ? entry.type : 'ANY'};
      if (entry.not) {
        filter[entry.field]['not'] = entry.not;
      }
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
              public value: any,
              public not: boolean = false,
              public type?: string) {
  }

}

export enum Operator {
  EQ = 'EQ', IN = 'IN', GT = 'GT', LT = 'LT', GTE = 'GTE', LTE = 'LTE', AND = 'AND', OR = 'OR'
}

export function operatorName(operator: Operator) {
  switch (operator) {
    case Operator.EQ:
      return 'equals';
    case Operator.IN:
      return 'in';
    case Operator.GT:
      return 'greater than';
    case Operator.LT:
      return 'less than';
    case Operator.GTE:
      return 'greater than or equals';
    case Operator.LTE:
      return 'less than or equals';
    case Operator.AND:
      return 'and';
    case Operator.OR:
      return 'or';
    default:
      return '';
  }
}
