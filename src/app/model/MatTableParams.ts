import {PageEvent} from '@angular/material';

export class MatTableParams {
  constructor(public length?: number,
              public pageSize?: number,
              public pageSizeOptions?: number[],
              public pageEvent?: PageEvent) {
  }
}
