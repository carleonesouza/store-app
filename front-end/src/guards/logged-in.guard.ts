import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/map';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.afAuth.authState.map(user => {
            if (user == null || localStorage.getItem('mSessionId') === null) {
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        });
    }
}
