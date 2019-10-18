import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewEncapsulation} from '@angular/core';
import { take } from 'rxjs/operators';
import { DataService } from 'src/services/data.service';
import { FrontStoreComponent } from 'src/front-store/front-store.component';


@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['splash.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SplashComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getProducts().
        pipe(take(1)).
        subscribe(() => {
            this.goToPage();
        })
        .unsubscribe();
    }

    goToPage() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(FrontStoreComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}

