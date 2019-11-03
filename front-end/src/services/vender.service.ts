import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Vender } from 'src/models/vender.model';
import { BillMethod } from '../models/bill-method';
import { BagVenders } from 'src/models/bag-venders';

@Injectable()
export class VenderService {
  private todo: BillMethod;
  private groupTodo: Array<BillMethod>;
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
      this.groupTodo = [];
  }


  // To get a list of all Venders
  getAllBags(): void {
    this.httpClient.get<BagVenders[]>(`${this.API_URL}/venders`).subscribe(data => {
      return data;
    },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + error.name + ' ' + error.message, 'RETRY', { duration: 3000 });
        console.log(error.name + ' ' + error.message);
      });
  }
  // To add a new Vender
  addBags(bags: BagVenders): void {
    this.httpClient.post(`${this.API_URL}/venders/add`, bags).subscribe(() => {
      this.snackBar.open('The product was Successifuly sold ', '', { duration: 4000 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + err.message, 'RETRY', { duration: 4000 });
      });
  }

  onTodo(e: number, f: string) {
      this.todo = {
        id: Math.random() + e,
        billValue: e,
        paymentMethod: f
      };
      if (this.groupTodo.length === 0) {
      this.groupTodo.push(this.todo);
    } else if (this.groupTodo.some(d => d.id !== this.todo.id)) {
      this.groupTodo.push(this.todo);
    }
  }

  getTodo(): Observable<BillMethod[]> {
    return new Observable((observer) => {
      if (this.groupTodo != null) {
        observer.next(this.groupTodo),
        observer.complete();
      } else {
        console.log('Todo is empty!');
      }
    });
  }


}
