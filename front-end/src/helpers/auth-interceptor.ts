import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (localStorage.getItem('mSessionId')) {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/vnd.api+json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
         Authorization: 'Bearer ' + localStorage.getItem('mSessionId')
      }
  });
    return next.handle(request);
  } else {
    return throwError(
      console.log());
  }

    }

}

