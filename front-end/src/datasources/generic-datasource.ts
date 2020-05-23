import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject} from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';


export class GenericDataSource implements DataSource<any> {
    private callback: Function;

    dataSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorHandler: Function = null;

    public loading$ = this.loadingSubject.asObservable();
    public count = 0;
    public empty = false;

    constructor() { }

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

                this.dataSubject.next(data);
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
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }
}
