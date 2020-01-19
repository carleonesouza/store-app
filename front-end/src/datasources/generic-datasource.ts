import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillMethod } from 'src/models/bill-method';
import { MatPaginator, MatSort } from '@angular/material';

export class GenericDataSource implements DataSource<any> {
  private callback: Function;

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  _filterChange = new BehaviorSubject('');
  private errorHandler: Function = null;

  public loading = this.loadingSubject.asObservable();
  public count = 0;
  public empty = false;

  constructor( public _paginator: MatPaginator,
               public _sort: MatSort) { }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filtertingData: any[] = [];
  renderedData: any[] = [];

  setCallback(callback: Function) {
      this.callback = callback;
  }

  setErrorHandler(errorHandler: Function) {
      this.errorHandler = errorHandler;
  }

  loadData(filter: string,
           pageIndex: number,
           pageSize: number) {
      this.loadingSubject.next(true);
      this.dataSubject.next([]);
      this.empty = false;

      this.callback(filter, pageIndex, pageSize)
          .subscribe(data => {
              this.loadingSubject.next(false);
              this.count = data.count;
              if (this.count === 0 || (data.data && data.data.length === 0)) {
                  this.empty = true;
              }

              this.dataSubject.next(data.data);
          }, err => {
              console.error(err);

              if (this.errorHandler != null) {
                  this.errorHandler(err);
              }

              this.empty = false;
              this.loadingSubject.next(false);
              this.dataSubject.next([]);
          });
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const displayDataChanges = [
        this._filterChange,
        this._paginator.page,
      ];

    return merge(...displayDataChanges).pipe(map(() => {
        // Filter data

        // Sort filtered data
        const sortedData = this.sortData(this.filtertingData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      },
      ));
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.dataSubject.complete();
      this.loadingSubject.complete();
  }

    /** Returns a sorted copy of the database data. */
    sortData(data: any[]): any[] {
        return data.sort((a, b) => {
          let propertyA: number | string = '';
          let propertyB: number | string = '';

          switch (this._sort.active) {
            case '_id': [propertyA, propertyB] = [a.id, b.id]; break;
          }

          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
      }

}

