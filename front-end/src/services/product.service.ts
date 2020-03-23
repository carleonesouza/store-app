import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Quantity } from 'src/models/quantity.model';
import { Vendor } from 'src/models/vendor.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  tempProduc: Product;
  quantity: Array<Quantity>;
  localQuantity: Quantity;
  vender: Array<Vendor>;
  localVender: Vendor;
  log: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.quantity = [];
    this.vender = [];
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
    })
  };

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // To get a list of Products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      environment.server + '/products', this.httpOptions);
  }

  // To get a list of all Products to table on create-product.component
  getAllProducts() {
    this.httpClient.get<Product[]>(environment.server + '/products', this.httpOptions).subscribe((data) => {
       this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process', 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }


  // Get a specific Product from the Store
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.server}/product/${id}`, this.httpOptions)
      .pipe();
  }

  // To update for getById
  updateById(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${environment.server}/product/${product._id}`, product, this.httpOptions)
      .pipe();
  }

  // To add a new Product
  addProduct(product: Product): void {
    this.httpClient.post(environment.server + '/product/add', product, this.httpOptions).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly created ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process', 'RETRY', { duration: 4000 });
        console.log(err);
      });
  }

  // To upadate a Product by id
  updateProduct(product: Product): void {
    this.httpClient.put(environment.server + '/' + product._id , product, this.httpOptions).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly updated', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred during this process ', 'RETRY', { duration: 4000 });
        console.log(err);
      });
  }

  // To delete a Product by id
  deleteProduct(product: Product): void {
    this.httpClient.request('delete', environment.server + '/' + product._id, this.httpOptions )
      .subscribe(() => {
        this.snackBar.open('The Product was Successifuly deleted', '', { duration: 4000 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred this process', 'RETRY', { duration: 4000 });
          console.log(err);
        }
      );
  }

  // To set Quantity of the product by id
  changeQuantity(product: Product): Observable<Product> {
    this.getProductById(product._id)
      .subscribe(
        (data: Product) => {
          if (this.quantity.length === 0) {
            this.localQuantity = new Quantity();
            this.localQuantity.productId = data._id;
            this.localQuantity.quantity = 0;
            this.quantity.push(this.localQuantity);

          } else if (this.quantity.length > 0) {
            this.localQuantity = new Quantity();
            this.localQuantity.productId = data._id;
            this.localQuantity.quantity = 0;

            if (this.quantity.some(e => e.productId === data._id)) {
              this.quantity.filter((item) => {
                if (item.productId === data._id) {
                  item.quantity = item.quantity + 1;
                }
              });
            } else {
              this.quantity.push(this.localQuantity);
            }
          }

          this.quantity.map(item => {
            if (item.productId === data._id) {
              product.quantity = item.quantity;
              this.onSelectedProducts(item);
            }
          });
        });
    return new Observable((observer) => {
      observer.next(product),
        observer.complete();
    });
  }

  onCleanQuantity(product: Product): Observable<Product> {
    if (this.quantity !== null) {
      this.quantity.map((element) => {
        if (element.productId === product._id) {
          element.quantity = element.quantity - 1;
        }
        this.quantity.map(item => {
          if (item.productId === product._id && item.quantity >= 0) {
            product.quantity = item.quantity;
            this.onSelectedProducts(item);
          }
        });
      });
    }
    return new Observable((observer) => {
      observer.next(product),
        observer.complete();
    });
  }
  // To set Vender
  onSelectedProducts(quant: Quantity) {
    this.getProductById(quant.productId)
      .subscribe(
        (data: Product) => {
          if (this.vender.length === 0) {
            this.localVender = new Vendor();
            this.localVender.productId = data._id;
            this.localVender.amount = 0;
            this.localVender.total = 0;
            this.vender.push(this.localVender);

          } else if (this.vender.length > 0) {
            this.localVender = new Vendor();
            this.localVender.productId = data._id;
            this.localVender.amount = 0;
            this.localVender.total = 0;

            if (this.vender.some(e => e.productId === data._id)) {
              this.vender.filter((item) => {
                if (item.productId === data._id) {
                  item.amount = quant.quantity;
                  item.total = item.amount * data.price;
                }

              });
            } else {
              this.vender.push(this.localVender);
            }
          }
        });

  }

  onBackVender(): Observable<Vendor[]> {
    return new Observable((observer) => {
      if (this.vender != null) {
        observer.next(this.vender),
          observer.complete();
      } else {
        console.log('Vender is empty!');
      }
    });
  }
}
