import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BillMethod } from '../models/bill-method';
import { BagVenders } from 'src/models/bag-venders';
import { HandleError } from './handleError';
import { catchError } from 'rxjs/operators';
import { Vendor } from 'src/models/vendor.model';

@Injectable()
export class VendorService {
  private static readonly endpoint: String  = 'http://localhost:3000/api/populate';
  private billGroup: Array<BillMethod>;
  private localBill;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
              private myHandleError: HandleError) {
      this.billGroup = [];
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


// Create a Vendor at the backend
addVendor(vendor: Vendor): void {
  this.httpClient.post(`${VendorService.endpoint}/vendor/add`, vendor).subscribe(() => {
    this.snackBar.open('The Vendor was Successifuly created ', '', { duration: 4000 });
    return;
  },
    (err: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      return;
    });
}

// Create a Vendor at the backend
addABMethod(bill: BillMethod): void {
  this.httpClient.post(`${VendorService.endpoint}/method`, bill).subscribe(() => {
    this.snackBar.open('The Vendor was Successifuly created ', '', { duration: 4000 });
    return;
  },
    (err: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      return;
    });
}


// Create an local [] of the BillMethod
  onBillMethod(e: number, f: string) {
    this.localBill = new BillMethod();
    if ( e !== 0) {
      this.localBill.id = Math.random() + e,
      this.localBill.billValue = e,
      this.localBill.paymentMethod = f;
    }
    if (this.billGroup.length === 0 && this.localBill !== null) {
      this.billGroup.push(this.localBill);
    } else if (this.billGroup.some(d => d.id !== this.localBill.id)) {
      this.billGroup.push(this.localBill);
    }
  }

  // To return a Observable of BillMethods[]
  onGetBillMehthod(): Observable<BillMethod[]> {
    return new Observable((observer) => {
      if (this.billGroup != null) {
        observer.next(this.billGroup),
        observer.complete();
      } else {
        console.log('Todo is empty!');
      }
    });
  }


}
