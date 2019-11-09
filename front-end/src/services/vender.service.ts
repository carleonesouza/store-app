import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BillMethod } from '../models/bill-method';
import { BagVenders } from 'src/models/bag-venders';
import { HandleError } from './handleError';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VenderService {
  private static readonly endpoint: String  = 'http://localhost:3000/api/vender';
  private todo: BillMethod;
  private groupTodo: Array<BillMethod>;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
              private myHandleError: HandleError) {
      this.groupTodo = [];
  }


// Create an local [] of the BillMethod
  onBillMethod(e: number, f: string) {
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

  // To return a Observable of BillMethods[]
  onGetBillMehthod(): Observable<BillMethod[]> {
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
