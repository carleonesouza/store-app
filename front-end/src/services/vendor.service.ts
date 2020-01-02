import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BillMethod } from '../models/bill-method';
import { HandleError } from './handleError';
import { Vendor } from 'src/models/vendor.model';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class VendorService {
  dataChange: BehaviorSubject<Vendor[]> = new BehaviorSubject<Vendor[]>([]);
  dataMethodChange: BehaviorSubject<BillMethod[]> = new BehaviorSubject<BillMethod[]>([]);
  private billGroup: Array<BillMethod>;
  private localBill: BillMethod;
  today = new Date().toLocaleDateString();
  bagBill: Array<BillMethod>;
  bagVender: Array<Vendor>;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
              private productService: ProductService) {
      this.billGroup = [];
      this.bagVender = [];
      this.bagBill = [];
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
    })
  };


  get data(): Vendor[] {
    return this.dataChange.value;
  }

  get dataMethod(): BillMethod [] {
    return this.dataMethodChange.value;
  }

// Create a Vendor at the backend
addVendor(vendor: Vendor): void {
  this.httpClient.post(environment.server + '/vendor/add', vendor, this.httpOptions ).subscribe(() => {
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
  this.httpClient.post(environment.server + '/method', bill, this.httpOptions)
  .subscribe(() => {
    this.snackBar.open('The Vendor was Successifuly created ', '', { duration: 4000 });
    return;
  },
    (err: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      return;
    });
}

// To Get a list of Vendors from backend
getAllVendors() {
  this.httpClient.get<Vendor[]>(`${environment.server}/vendors`, this.httpOptions).subscribe(data => {
    data.map((vendor) => {
      this.productService.getProductById(vendor.productId
        ).subscribe((product) => {
          if (vendor.productId === product._id) {
            vendor.name = product.name;
          }
        }
      );
    });
    this.dataChange.next(data);
  },
    (error: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
      console.log(error.name + ' ' + error.message);
    });
}

// To Get a list of Methods from backend
getAllMethods() {
  this.httpClient.get<BillMethod[]>(`${environment.server}/methods`, this.httpOptions).subscribe(data => {
    const billCredit = data.filter(element => element.paymentMethod === 'Credit');
    const billCash = data.filter(element => element.paymentMethod === 'Cash');
    const billDebit = data.filter(element => element.paymentMethod === 'Debit');
    const myBil = new BillMethod();
    billCredit.map((item) => {
      myBil.paymentMethod = item.paymentMethod;
      myBil.billValue = myBil.billValue + item.billValue;
    } );
    const myBll = new BillMethod();
    billCash.map((item) => {
      myBll.paymentMethod = item.paymentMethod;
      myBll.billValue = myBll.billValue + item.billValue;
    } );
    const myBill = new BillMethod();
    billDebit.map((item) => {
      myBill.paymentMethod = item.paymentMethod;
      myBill.billValue = myBill.billValue + item.billValue;
    } );
    this.bagBill.push(myBill, myBll, myBil);
    this.dataMethodChange.next(this.bagBill);
  },
    (error: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
      console.log(error.name + ' ' + error.message);
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

  // To return a local Observable of BillMethods[]
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
