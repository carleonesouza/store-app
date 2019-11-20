import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewEncapsulation} from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service';
import { FrontStoreComponent } from 'src/front-store/front-store.component';


@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['splash.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SplashComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef, private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().
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

