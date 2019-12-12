import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'home-splash',
    templateUrl: './home-splash.component.html',
    styleUrls: ['home-splash.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeSplashComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef,
                private auth: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.auth.authenticated) {
            this.goToApp();
        } else {
            this.router.navigate(['/login']);
        }
    }


    goToApp() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AppComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
