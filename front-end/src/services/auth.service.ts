import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material';
import { HandleError } from './handleError';


@Injectable({ providedIn: 'root' })
export class AuthService {
    public user: User = null;
    public idToken: string = null;
    public uid: string = null;
    public avatar: string = null;
    public name: string = null;
    public email: string = null;
    public role: string = null;



    constructor(private httpClient: HttpClient, private router: Router,
                private hanldeError: HandleError, private snackBar: MatSnackBar) {
    }

    login(username: string, password: string, accessToken: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/vnd.api+json');
    return this.httpClient.post<User>(`${environment.server}/login`, { username, password, accessToken },
     {headers}).pipe(
         catchError(this.hanldeError.handleError<any>('PostUser'))
     );
    }

    get authenticated(): boolean {
        if (localStorage.getItem('mSessionId') !== null) {
            return true;
        }
        return false;
    }

    userAuth(): Observable<User> {
        return this.httpClient.get<User>(`${environment.server}/user`)
        .pipe(
            catchError(this.hanldeError.handleError<User>('getUser'))
          );
    }



   tokenGetter() {
        return localStorage.getItem('mSessionId');
      }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('mSessionId');
        this.router.navigate(['/']);
    }
}
