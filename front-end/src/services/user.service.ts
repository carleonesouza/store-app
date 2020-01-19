import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';


@Injectable()
export class UserService {
    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;



    constructor(private httpClient: HttpClient) {    }

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
        })
      };

      get data(): User[] {
        return this.dataChange.value;
      }

      getDialogData() {
        return this.dialogData;
      }

      // To get a list of Users
      getUsers(): Observable<any> {
        return this.httpClient.get<User[]>(
          environment.server + '/users', this.httpOptions);
      }


  // Get a specific User from the Store
  getProductById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.server}/user/${id}`, this.httpOptions)
      .pipe();
  }


}
