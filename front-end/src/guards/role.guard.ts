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
export class RoleGuard implements CanActivate {
    constructor(private router: Router,) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return  /* this.auth.afAuth.authState.map(user => {
            if (this.auth.role === null) {
                setTimeout(() => this.check(next), 100);
            }

            if (user === null ||
                localStorage.getItem('mSessionId') === null ||
                (this.auth.role !== null && this.auth.role !== next.data['role'])) {
                    this.router.navigate(['/']);
                    return false;
            } else {
                return true;
            }
        }); */
    }

    check(next) {
       /*  if (this.auth.role === null) {
            setTimeout(() => this.check(next), 100);
        } else if (this.auth.role !== next.data['role']) {
            console.log(`Permission denied (got '${this.auth.role}', need '${next.data['role']}')`);
            this.router.navigate(['/dashboard']);
        } */
    }
}
