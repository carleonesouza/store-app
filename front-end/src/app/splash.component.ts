import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { StoreAppService } from '../services/store-app.service';

@Component({
    selector: 'store',
    templateUrl: './splash.component.html',
    styleUrls: ['splash.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SplashComponent implements OnInit {
    deactivated = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef,
                private auth: AuthService,
                private Store: StoreAppService) { }

    ngOnInit() {
        this.auth.afAuth.authState.subscribe(user => {
            if (this.deactivated) {
                return;
            }

            if (user) {
                this.auth.user = user;
                this.auth.uid = user.uid;
                this.auth.avatar = user.photoURL.replace('s96-c', 's512-c');
                this.auth.name = user.displayName;
                this.auth.email = user.email;

                user.getIdToken(false)
                    .then(idToken => {
                        this.auth.idToken = idToken;

                        this.Store.doAccountCheck(this.auth.email)
                            .subscribe(r => {
                                this.auth.role = r.role;
                                console.log(`Role: ${r.role}`);
                                this.goToApp();
                            }, e => {
                                console.error('Failed to check user account!', e);
                                this.auth.afAuth.auth.signOut()
                                    .then(() => this.goToApp(true))
                                    .catch(() => this.goToApp(true));
                            });
                    })
                    .catch(e => {
                        console.error('Failed to obtain user ID token!', e);
                        this.auth.afAuth.auth.signOut()
                            .then(() => this.goToApp(true))
                            .catch(() => this.goToApp(true));
                    });
            } else {
                console.log('Not logged in :/');
                localStorage.clear();
                this.goToApp(false);
            }
        }, err => {
            this.goToApp(false);
        });
    }

    goToApp(errored: boolean = false) {
        this.deactivated = true;
        if (errored) {
            localStorage.clear();
            window.location.href = '/';
            return;
        }

        const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
