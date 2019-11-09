import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { HandleError } from './handleError';
import { Observable } from 'rxjs';
import { BagVenders } from 'src/models/bag-venders';
import { VenderService } from './vender.service';
import { catchError } from 'rxjs/operators';
import { ManagementModel } from 'src/models/management.model';
import { BillMethod } from 'src/models/bill-method';
import { Vender } from 'src/models/vender.model';

@Injectable()
export class ManagementService {
    private static readonly endpoint: String  = 'http://localhost:3000/api/vender';
    bagVender: BagVenders[];
    private billMethod: BillMethod;
    private  vender: Vender;
    localDate = new Date();

    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
                private myHandleError: HandleError) {
                    this.bagVender = [];
                  }

    // To get a list of all Venders
    getAllBags(): Observable<BagVenders[]> {
      return this.httpClient.get<BagVenders[]>(`${ManagementService.endpoint}`)
      .pipe(
        catchError(this.myHandleError.handleError<BagVenders[]>('getAllBags', []))
      );
    }
    // To add a new Vender
    addBags(bags: BagVenders): void {
      this.httpClient.post(`${ManagementService.endpoint}/add`, bags).subscribe(() => {
        this.snackBar.open('The product was Successifuly sold ', '', { duration: 4000 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
        });
    }

/*     onDataForHome() {
        this.getAllBags().subscribe(
            (data: BagVenders[]) => {
                if (data.some(e => e.createdAt)) {
                    if (data.some(f => f.billsMethod.some(c => c.paymentMethod === 'Cash')) ) {
                        data.map(
                            (l) => {
                                l.billsMethod.map((m) => {
                                    if (m.paymentMethod === 'Cash') {
                                        this.localmanagement.paymentMethod = m.paymentMethod;
                                        this.localmanagement.billValue = this.localmanagement.billValue + m.billValue;
                                    }

                                });
                            }
                        );
                     }
                    if (data.some(x => x.billsMethod.some(g => g.paymentMethod === 'Debit')) ) {
                        data.map(
                            (n) => {
                                this.localmanagement = new ManagementModel();
                                n.billsMethod.map((m) => {
                                    if (m.paymentMethod === 'Debit') {
                                        this.localmanagement.paymentMethod = m.paymentMethod;
                                        this.localmanagement.billValue = this.localmanagement.billValue + m.billValue;
                                    }
                                });

                                this.management.push(this.localmanagement);
                            }
                        );
                     }
                    if (data.some(z => z.billsMethod.some(g => g.paymentMethod === 'Credit')) ) {
                        data.map(
                            (o) => {
                                this.localmanagement = new ManagementModel();
                                o.billsMethod.map((m) => {
                                    if (m.paymentMethod === 'Credit') {
                                        this.localmanagement.paymentMethod = m.paymentMethod;
                                        this.localmanagement.billValue = this.localmanagement.billValue + m.billValue;
                                    }
                                });
                                this.management.push(this.localmanagement);
                            }
                        );
                     }
                }
            }
        );
    } */



}
