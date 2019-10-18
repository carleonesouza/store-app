import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { Quantity } from 'src/models/quantity.model';
import { Vender } from 'src/models/vender.model';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:3000/api';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  tempProduc: Product;
  quantity: Array<Quantity>;
  localQuantity: Quantity;
  vender: Array<Vender>;
  localVender: Vender;
  log: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.quantity = [];
    this.vender = [];
    this.localVender = new Vender();
  }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // To get a list of Products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/products`)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  // To get a list of all Products to table on create-product.component
  getAllProducts() {
    this.httpClient.get<Product[]>(`${this.API_URL}/products`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }

  // Get a specific Product from the Store
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_URL}/product/${id}`)
      .pipe(
        catchError(this.handleError<Product>('getProductById'))
      );
  }

  // To update for getById
  updateById(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.API_URL}/product/${product._id}`, product)
      .pipe(
        catchError(this.handleError('updateHero', product))
      );
  }

  // To add a new Product
  addProduct(product: Product): void {
    this.httpClient.post(`${this.API_URL}/product/add`, product).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly created ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

  // To upadate a Product by id
  updateProduct(product: Product): void {
    this.httpClient.put(`${this.API_URL}/product/${product._id}`, product).subscribe(() => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly updated', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details:  ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

  // To delete a Product by id
  deleteProduct(product: Product): void {
    this.httpClient.request('delete', `${this.API_URL}/product/${product._id}`, { body: product })
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

          console.log(this.quantity);
          this.quantity.map(item => {
            if (item.productId === data._id) {
              product.quantity = item.quantity;
            }
          });
        });
    return new Observable((observer) => {
      observer.next(product),
        observer.complete();
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

 /*  this.localVender.amount = this.localQuantity.quantity;
            this.localVender.total = this.localVender.amount * data.price;
            if (this.vender.filter(e => e.productId === this.localVender.productId).length > 0) {
              this.vender.forEach(item => {
                item.amount = this.localVender.amount;
              });
            }
            this.vender.push(this.localVender); */

