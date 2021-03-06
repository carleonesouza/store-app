import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillMethod } from '../models/bill-method';
import { Vendor } from 'src/models/vendor.model';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { Wallet } from 'src/models/wallet.model';

@Injectable()
export class VendorService {
  dataChange: BehaviorSubject<Vendor[]> = new BehaviorSubject<Vendor[]>([]);
  dataMethodChange: BehaviorSubject<BillMethod[]> = new BehaviorSubject<BillMethod[]>([]);
  private billGroup: Array<BillMethod>;
  private localBill: BillMethod;
  today = new Date().toLocaleDateString();
  localVendor;
  bagBill: Array<BillMethod>;
  bagVender: Array<Vendor>;
  localBag: Array<Vendor>;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
              private productService: ProductService) {
    this.billGroup = [];
    this.bagVender = [];
    this.bagBill = [];
    this.localBag = [];
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
    })
  };


  get data(): Vendor[] {
    return this.dataChange.value;
  }

  get dataMethod(): BillMethod[] {
    return this.dataMethodChange.value;
  }

  // Create a Vendor at the backend
  addVendor(vendor: Vendor): void {
    this.httpClient.post(environment.server + '/vendor/add', vendor, this.httpOptions).subscribe(() => {
      this.snackBar.open('The Vendor was Successifuly created ', '', { duration: 4000 });
      return;
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during add a Vendor', '', { duration: 4000 });
        console.log(err);
        return;
      });
  }

  // Create a Bill at the backend
  addABMethod(bill: BillMethod): void {
    this.httpClient.post(environment.server + '/method', bill, this.httpOptions)
      .subscribe(() => {
        this.snackBar.open('The Vendor was Successifuly created ', '', { duration: 4000 });
        return;
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred During add A bill', '', { duration: 4000 });
          console.log(err);
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
        });
      });
      data.map((v) => {
        if (this.localBag.length === 0) {
          this.localBag.push(v);
        } else if (this.localBag.some(e => e.productId === v.productId)) {
          this.localBag.filter((lb) => {
            if (lb.productId === v.productId) {
              lb.amount = lb.amount + v.amount;
              lb.total = lb.total + v.total;
            }
          });
        } else {
          this.localBag.push(v);
        }
     });
      this.dataChange.next(this.localBag);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred list all Vendors', '', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }

  getVendors() {
   this.httpClient.get<Vendor[]>(environment.server + '/vendors', this.httpOptions)
    .pipe();
  }

  // To Get a list of Methods from backend
  getAllMethods() {
    this.httpClient.get<BillMethod[]>(`${environment.server}/methods`, this.httpOptions).subscribe(data => {
      const billCredit = data.filter(element => element.payMethod === 'Credit');
      const billCash = data.filter(element => element.payMethod === 'Cash');
      const billDebit = data.filter(element => element.payMethod === 'Debit');
      const myBil = new BillMethod();
      billCredit.map((item) => {
        myBil.payMethod = item.payMethod;
        myBil.billValue = myBil.billValue + item.billValue;
      });

      const myBll = new BillMethod();
      billCash.map((item) => {
        myBll.payMethod = item.payMethod;
        myBll.billValue = myBll.billValue + item.billValue;
      });

      const myBill = new BillMethod();
      billDebit.map((item) => {
        myBill.payMethod = item.payMethod;
        myBill.billValue = myBill.billValue + item.billValue;
      });

      this.bagBill.push(myBill, myBll, myBil);
      this.dataMethodChange.next(this.bagBill);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process ', '', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }

  onCreateWallet(wallet: Wallet) {
    this.httpClient.post(environment.server + '/wallets/add', wallet, this.httpOptions).subscribe(() => {
      this.snackBar.open('The Wallet was Successifuly created ', '', { duration: 4000 });
      return;
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during add a Wallet', '', { duration: 4000 });
        console.log(err);
        return;
      });
  }

  onCheckWallets(): Observable<Wallet[]> {
    if(!this.httpOptions){
      console.log('Headers Empity');
    }else{
      return this.httpClient.post<Wallet[]>(environment.server + '/wallets', this.httpOptions)
      .pipe();
    }
  }

  getAWallet(wallet: Wallet): Observable <Wallet> {
    return this.httpClient.get<Wallet>(environment.server + `/wallets/${wallet._id}`, this.httpOptions)
    .pipe();
  }

  getAWalletVendor(wallet: Wallet) {
    return this.httpClient.get<Wallet>(environment.server + `/wallets/${wallet._id}`, this.httpOptions)
    .pipe()
    .subscribe((data: Wallet) => {
      data.vendors.map((v: Vendor) => {
        if (this.localBag.length === 0) {
          this.localBag.push(v);
        } else if (this.localBag.some(e => e.productId === v.productId)) {
          this.localBag.filter((lb) => {
            if (lb.productId === v.productId) {
              lb.amount = lb.amount + v.amount;
              lb.total = lb.total + v.total;
            }
          });
        } else {
          this.localBag.push(v);
        }
     });
      console.log(this.localBag);
    });
  }

  getAWalletByDate(consult: any): Observable <Wallet> {
    return this.httpClient.post<Wallet>(environment.server + `/wallets/${consult}`, this.httpOptions)
    .pipe();
  }

  onAddVendorsAWallet(vendor: Vendor): Observable<Vendor> {
    if (localStorage.getItem('walletId') !== null) {
    return this.httpClient.post<Vendor>(environment.server + `/wallets/add/vendor`, {vendor, walletId: localStorage.getItem('walletId')}
     , this.httpOptions)
      .pipe()
    }
  }



  onCloseAWallet(wallet: Wallet) {
    this.httpClient.put(environment.server + '/wallets/' + wallet._id , wallet, this.httpOptions).subscribe(() => {
      this.snackBar.open('The Wallet was Successifuly closed!', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process ', 'RETRY', { duration: 4000 });
        console.log(err);
      });
  }

  addBillAWallet(bill: BillMethod) {
    this.onCheckWallets().subscribe((wallets) => {
      wallets.map((wallet) => {
        if (wallet.status && wallet.finishValue === 0) {
          this.httpClient.post(environment.server + '/wallets/add/bill', {bill, walletId: wallet._id}, this.httpOptions)
          .subscribe(() => {
            this.snackBar.open('The Bill was Successifuly Add ', '', { duration: 4000 });
            return;
          },
            (err: HttpErrorResponse) => {
              this.snackBar.open('Error occurred during add a Bill', '', { duration: 4000 });
              console.log(err);
              return;
            });
        } else {
          console.log('Wallet not found!');
        }
      });
    });
  }


  // Create an local [] of the BillMethod
  onBillMethod(e: number, f: string) {
    this.localBill = new BillMethod();
    if (e !== 0) {
      this.localBill.id = Math.random() + e,
        this.localBill.billValue = e,
        this.localBill.payMethod = f
    }
    if (this.billGroup.length === 0 ) {
      this.billGroup.push(this.localBill);
      console.log(this.billGroup);
    } else if (this.billGroup.some(d => d.id !== this.localBill.id)) {
      console.log(this.billGroup);
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

  onGetVendor() {
      if (!this.bagVender) {
      console.log('Vendor is empty!');
    } else {
      this.bagVender.map((v) => {
        if (this.localBag.length === 0) {
          this.localBag.push(v);
        } else if (this.localBag.some(e => e.productId === v.productId)) {
          this.localBag.filter((lb) => {
            if (lb.productId === v.productId) {
              lb.amount = lb.amount + v.amount;
              lb.total = lb.total + v.total;
            }
          });
        } else {
          this.localBag.push(v);
        }
     });
    }

  }

}
