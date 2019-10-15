import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:3000/api';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  log: any;
  amountToSold = 0;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/products`)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  // To get a list of all Products
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
        catchError(this.handleError<Product>('getProductById', ))
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
  setAmount(product: Product) {
    const prod = this.getProductById(product._id);
  }

  setOnClean(product: Product) {
    this.getProductById(product._id)
    .subscribe( () => {
      if (this.amountToSold > 0) {
        this.amountToSold = this.amountToSold - 1;
      }
    });

  }

  getAmount(): number {
    console.log(this.amountToSold);
    return this.amountToSold;
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


