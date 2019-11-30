import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { Quantity } from 'src/models/quantity.model';
import { Vendor } from 'src/models/vendor.model';
import { HandleError } from './handleError';

@Injectable()
export class ProductService {
  private static readonly endpoint: String  = 'http://localhost:3000/api/product';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  tempProduc: Product;
  quantity: Array<Quantity>;
  localQuantity: Quantity;
  vender: Array<Vendor>;
  localVender: Vendor;
  log: any;

  constructor(private httpClient: HttpClient, private myHandleError: HandleError,
              private snackBar: MatSnackBar) {
    this.quantity = [];
    this.vender = [];
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
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
    return this.httpClient.get<Product[]>(`${ProductService.endpoint}`)
      .pipe(
        catchError(this.myHandleError.handleError<Product[]>('getProducts', []))
      );
  }

  // To get a list of all Products to table on create-product.component
  getAllProducts() {
    this.httpClient.get<Product[]>(`${ProductService.endpoint}`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }

  // Get a specific Product from the Store
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${ProductService.endpoint}/${id}`)
      .pipe(
        catchError(this.myHandleError.handleError<Product>('getProductById'))
      );
  }

  // To update for getById
  updateById(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${ProductService.endpoint}/${product._id}`, product)
      .pipe(
        catchError(this.myHandleError.handleError('updateHero', product))
      );
  }

  // To add a new Product
  addProduct(product: Product): void {
    this.httpClient.post(`${ProductService.endpoint}/add`, product).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly created ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

  // To upadate a Product by id
  updateProduct(product: Product): void {
    this.httpClient.put(`${ProductService.endpoint}/${product._id}`, product).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly updated', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details:  ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

  // To delete a Product by id
  deleteProduct(product: Product): void {
   this.httpClient.request('delete', `${ProductService.endpoint}/${product._id}`, { body: product })
      .subscribe(() => {
        this.snackBar.open('The Product was Successifuly deleted', '', { duration: 4000 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Error occurred. Details:  ' + err.message, 'RETRY', { duration: 4000 });
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