import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    public user: any;
    public idToken: string = null;
    public uid: string = null;
    public name: string = null;
    public email: string = null;
    public role: string = null;

    constructor(private router: Router) { }

    get authenticated(): boolean {
        return localStorage.getItem('mSessionId') !== null;
    }

    signOut(): void {
       // this.afAuth.auth.signOut();

        if (window && window.localStorage) {
            window.localStorage.clear();
        }

        this.idToken = null;
        this.uid = null;
        this.name = null;
        this.email = null;
        this.role = null;

        this.router.navigate(['/']);
    }
}
