import { Component,
    ViewEncapsulation,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as _moment from 'moment';


import { AuthService } from '../services/auth.service';
import { StoreAppService } from '../services/store-app.service';
import { CloseCashierDialogComponent } from 'src/pages/dialogs/close-cashier/close-cashier-dialog.component';
import { VendorService } from 'src/services/vendor.service';
import { from } from 'rxjs';


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

    showProgress = false;
    navItems = {
        null: [],
        admin: [
            { name: 'Home', route: '/home', icon: 'home' },
            { name: 'Store', route: '/front-store', icon: 'store' },
            { name: 'Product', route: '/admin/dashboard-adm', icon: 'shopping_basket' },
            { name: 'Users Panel', route: '/admin/management-users', icon: 'supervisor_account' },
            { name: 'Close Wallet', route: '/#', icon: 'attach_money' },
        ],

        vendor: [
            { name: 'Profile', route: '/vendor/user-profile', icon: 'account' },
            { name: 'Store', route: '/front-store', icon: 'store' },
            { name: 'Home', route: '/home', icon: 'home' },
            { name: 'Close Wallet', route: '/#', icon: 'attach_money' },
        ]
    };

    constructor(public auth: AuthService,
                public Store: StoreAppService,
                private vendorService: VendorService,
                public SnackBar: MatSnackBar,
                private dialog: MatDialog,
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
                        this.SnackBar.open('An error ocurred ' + err, null, { duration: 3000 });
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

    onClose() {
          if (this.auth.authenticated && localStorage.getItem('userOpenId')) {
            this.vendorService.onCheckWallets()
            .subscribe((wallets) => {
                    if (wallets.some(e => e.userId === localStorage.getItem('userOpenId'))) {
                       const wallet = wallets.find(e => e.finishValue === 0);
                       // moment(e.createdAt).locale('pt-br').format('L') === moment().locale('pt-br').format('L'));
                       this.dialog.open(CloseCashierDialogComponent, {data: wallet});
                    }
            });
        }
    }
}
