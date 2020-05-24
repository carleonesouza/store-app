import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    public user: firebase.User = null;
    public idToken: string = null;
    public uid: string = null;
    public avatar: string = null;
    public name: string = null;
    public email: string = null;
    public role: string = null;

    constructor(public afAuth: AngularFireAuth,
                private router: Router) { }

    get authenticated(): boolean {
        return this.user !== null && localStorage.getItem('mSessionId') !== null;
    }

    signOut(): void {
        this.afAuth.auth.signOut();

        if (window && window.localStorage) {
            window.localStorage.clear();
        }

        this.user = null;
        this.idToken = null;
        this.uid = null;
        this.avatar = null;
        this.name = null;
        this.email = null;
        this.role = null;

        this.router.navigate(['/']);
    }
}
