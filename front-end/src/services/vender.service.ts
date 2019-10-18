import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Vender } from 'src/models/vender.model';

@Injectable()
export class VenderService {
  productAmount = 0;
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }


  // To get a list of all Venders
  getAllVenders(): void {
    this.httpClient.get<Vender[]>(`${this.API_URL}/venders`).subscribe(data => {
      return data;
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }
  // To add a new Vender
  addProduct(product: Product): void {
    this.httpClient.post(`${this.API_URL}/vender/add`, product).subscribe(() => {
      this.snackBar.open('The product was Successifuly sold ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

}
