import { Component,
    ViewEncapsulation,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { MatMenu, MatSnackBar, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StoreAppService } from '../services/store-app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    @ViewChild('authMenu', { static: true})
    authMenu: MatMenu;

    @ViewChild('start', { static: true})
    start: MatSidenav;

    isTutor = false;
    notUnderMtor = true;
    showProgress = false;
    navItems = {
        null: [],
        admin: [
            { name: 'Home', route: '/home', icon: 'home' },
            { name: 'Store', route: '/front-store', icon: 'store' },
            { name: 'Product', route: '/admin/product', icon: 'shopping_basket' },
            { name: 'Users Panel', route: '/admin/management-users', icon: 'supervisor_account' },
        ],

        vendor: [
            { name: 'Profile', route: '/vendor/user-profile', icon: 'account' },
            { name: 'Store', route: '/front-store', icon: 'store' },
            { name: 'Home', route: '/home', icon: 'home' },
        ]
    };

    constructor(public auth: AuthService,
                public Store: StoreAppService,
                public SnackBar: MatSnackBar,
                public router: Router,
                private ref: ChangeDetectorRef) {
        setInterval(() => {
            // the following is required, otherwise the view will not be updated
            this.ref.markForCheck();
        }, 1000);

        setInterval(() => {
            if (this.auth.authenticated) {
                console.log('Refreshing ID Token...');
                this.showProgress = true;

                this.auth.afAuth.auth.currentUser.getIdToken(true)
                    .then(idToken => {
                        this.showProgress = false;
                        this.auth.idToken = idToken;
                    })
                    .catch(err => {
                        console.error(err);
                        this.showProgress = false;
                    });
            }
        }, 900000);
    }

    toggleIfMobile() {
        if (window.innerWidth < 640) {
            this.start.close();
        }
    }

    signOut() {
        this.showProgress = true;

        this.Store.doLogout(this.auth.user.email)
            .subscribe(() => {
                this.auth.signOut();
                this.showProgress = false;
            }, e => {
                console.error(e);
                this.showProgress = false;
                this.SnackBar.open('An error ocurred while logging out.', null, { duration: 3000 });
            });
    }
}
