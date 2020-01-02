import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorService } from './vendor.service';
import { BillMethod } from '../models/bill-method';

export class BillDataSource extends DataSource<BillMethod> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filtertingData: BillMethod[] = [];
  renderedData: BillMethod[] = [];

  constructor(public _exampleDatabase: VendorService, public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<BillMethod[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataMethodChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this._exampleDatabase.getAllMethods();

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filtertingData = this._exampleDatabase.dataMethod.slice().filter((bill: BillMethod) => {
        const searchStr = (bill.paymentMethod);
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filtertingData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    },
    ));
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: BillMethod[]): BillMethod[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'paymentMethod': [propertyA, propertyB] = [a.paymentMethod, b.paymentMethod]; break;
        case 'billValue': [propertyA, propertyB] = [a.billValue, b.billValue]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
