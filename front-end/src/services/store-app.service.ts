import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';


@Injectable()
export class StoreAppService {

    constructor(private http: HttpClient,
                private auth: AuthService) { }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('mSessionId'),
        })
      };

    getBetterQualityAvatarURL(avatarURL: string) {
        if (!avatarURL || typeof avatarURL !== 'string') {
            return avatarURL;
        }

        return avatarURL.replace(/s96-c/gi, 's1024-c');
    }


    public doLogin(user: firebase.User): Observable<any> {
        return this.http.post(
            environment.server + '/account/login', { user });
    }

    public doAccountCheck(email): Observable<any> {
        return this.http.post(
            environment.server + '/account/check', {email},
           this.httpOptions
        );
    }

    public doLogout(email): Observable<any> {
        return this.http.post(
           environment.server + '/account/logout', {email},
            this.httpOptions
        );
    }

    fetchGenericDataList(method, filter = null, pageNumber = null, pageSize = null): Observable<any> {
        return this.http.post(
            environment.server + method,
            {
                filter,
                pageNumber,
                pageSize
            },
            this.httpOptions
        );
    }


    getGenericAction(method): Observable<any> {
        return this.http.get(
            environment.server + method,
           this.httpOptions
        );
    }

    postGenericAction(method, body): Observable<any> {
        return this.http.post(
            environment.server + method,
            body,
            this.httpOptions
        );
    }

    deleteGenericAction(method): Observable<any> {
        return this.http.delete(
            environment.server + method,
            this.httpOptions
        );
    }
}
