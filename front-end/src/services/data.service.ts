import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:3000/api';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

 // To get a list of all Products
  getAllProducts(): void {
    this.httpClient.get<Product[]>(`${this.API_URL}/products`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }

  // To add a new Product
  addProduct(product: Product): void {
    this.httpClient.post(`${this.API_URL}/product/add`, product).subscribe(data => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly created ', '', { duration: 4000 });
      },
      (err: HttpErrorResponse) => {
      this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
    });
  }
  // To upadate a Product by id
  updateProduct(product: Product): void {
    this.httpClient.put(`${this.API_URL}/product/${product._id}`, product).subscribe(data => {
      this.dialogData = product;
      this.snackBar.open('The Product was Successifuly updated', '', { duration: 4000 });
    },
    (err: HttpErrorResponse) => {
    this.snackBar.open('Error occurred. Details:  ' + err.message, 'RETRY', { duration: 4000 });
  });
  }

  // To delete a Product by id
  deleteProduct(product: Product): void {
    this.httpClient.request('delete', `${this.API_URL}/product/${product._id}`, {body: product})
    .subscribe(() => {
      this.snackBar.open('The Product was Successifuly deleted', '', { duration: 4000 });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details:  ' + err.message, 'RETRY', { duration: 4000 });
      }
    );
  }
}


