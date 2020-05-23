import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { HandleError } from './handleError';
import { Observable, BehaviorSubject } from 'rxjs';
import { BagVenders } from 'src/models/bag-venders';
import { VendorService } from './vendor.service';
import { catchError } from 'rxjs/operators';
import { ManagementModel } from 'src/models/management.model';
import { BillMethod } from 'src/models/bill-method';
import { Vendor } from 'src/models/vendor.model';
import * as moment from 'moment';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ManagementService {
    private static readonly endpoint: String = 'http://localhost:3000/api/management';
    dataChange: BehaviorSubject<Vendor[]> = new BehaviorSubject<Vendor[]>([]);
    bagBill: Array<ManagementModel>;
    bagVender: Array<Vendor>;
    private billMethod: BillMethod;
    private vender: Vendor;
    localDate = new Date();

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private vendrService: VendorService,
                private myHandleError: HandleError, private productService: ProductService) {
        this.bagVender = [];
        this.bagBill = [];
    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
        })
      };

    // To get a list of all Venders
    getAllBags(): Observable<BagVenders[]> {
        return this.httpClient.get<BagVenders[]>(`${environment.server}`, this.httpOptions)
            .pipe(
                catchError(this.myHandleError.handleError<BagVenders[]>('getAllBags', []))
            );
    }

    // To add a new Vender
    addBags(bags: BagVenders): void {
        this.httpClient.post(`${environment.server}/add`, bags, this.httpOptions).subscribe(() => {
            this.snackBar.open('The product was Successifuly sold ', '', { duration: 4000 });
        },
            (err: HttpErrorResponse) => {
                this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
            });
    }

    onDataForHome(date: string) {
 /*        this.getAllBags().subscribe(
            (data: BagVenders[]) => {
                if (data.some(e => moment(e.createdAt).locale('pt-br').format('l') === date)) {
                    if (data.some(f => f.billsMethod.some(c => c.paymentMethod === 'Cash'))) {
                            data.map(
                                (selectedItem) => {
                                    selectedItem.billsMethod.filter((item) => {
                                        if (item.paymentMethod === 'Cash') {
                                            const management = new ManagementModel();
                                            management.paymentMethod = item.paymentMethod;
                                            management.billValue = management.billValue + item.billValue;
                                            this.bagBill.push(management);
                                        }
                                    });
                                });
                    }
                    if (data.some(x => x.billsMethod.some(g => g.paymentMethod === 'Debit'))) {
                        data.map(
                            (selectedItem) => {
                                selectedItem.billsMethod.filter((item) => {
                                    if (item.paymentMethod === 'Debit') {
                                        const management = new ManagementModel();
                                        management.paymentMethod = item.paymentMethod;
                                        management.billValue = management.billValue + item.billValue;
                                        this.bagBill.push(management);
                                    }
                                });
                            });
                    }
                    if (data.some(z => z.billsMethod.some(g => g.paymentMethod === 'Credit'))) {
                        data.map(
                            (selectedItem) => {
                                selectedItem.billsMethod.filter((item) => {
                                    if (item.paymentMethod === 'Credit') {
                                        const management = new ManagementModel();
                                        management.paymentMethod = item.paymentMethod;
                                        management.billValue = management.billValue + item.billValue;
                                        this.bagBill.push(management);
                                    }
                                });
                            });
                    }
                }
                console.log(this.bagBill);
            }
        ); */
    }

    get data(): Vendor[] {
        return this.dataChange.value;
      }

    onVenderHome(date: string) {
       /* this.getAllBags().subscribe(
            (data: BagVenders[]) => {
                if (data.some(e => moment(e.createdAt).locale('pt-br').format('l') === date)) {
                    data.map(
                        (pr) => {
                            pr.venders.map(
                                (prd) => {
                                    if (this.bagVender.length === 0) {
                                        this.productService.getProductById(prd.productId).subscribe(
                                            (come) => {
                                                this.vender = new Vendor();
                                                this.vender.name = come.name;
                                                this.vender.amount = this.vender.amount + prd.amount;
                                                this.vender.total = this.vender.total + prd.total;
                                                this.bagVender.push(this.vender);
                                            }
                                        );

                                    } else if (this.bagVender.some(e => e.productId === prd.productId)) {
                                        this.productService.getProductById(prd.productId).subscribe(
                                            (come) => {
                                                this.vender = new Vendor();
                                                this.vender.name = come.name;
                                                this.vender.amount = this.vender.amount + prd.amount;
                                                this.vender.total = this.vender.total + prd.total;
                                                this.bagVender.push(this.vender);
                                            }
                                        );

                                    } else {
                                    this.vender = new Vender();
                                    this.dateService.getProductById(prd.productId).subscribe(
                                        (come) => {
                                            this.vender.name = come.name;
                                            this.vender.amount = this.vender.amount + prd.amount;
                                            this.vender.total = this.vender.total + prd.total;
                                            this.bagVender.push(this.vender);
                                        }
                                    );
                                }
                                });
                        });
                }
            });*/
    }

    onBackBagVender(): Observable<Vendor[]> {
        return new Observable((observer) => {
            if (this.bagVender != null) {
                observer.next(this.bagVender),
                    observer.complete();
            } else {
                console.log('Vender is empty!');
            }
        });
    }

    onBackBagBill(): Observable<ManagementModel[]> {
        return new Observable((observer) => {
            if (this.bagBill != null) {
                observer.next(this.bagBill),
                    observer.complete();
            } else {
                console.log('Vender is empty!');
            }
        });
    }


}
