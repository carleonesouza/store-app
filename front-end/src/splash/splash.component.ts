import {
    Component,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateProductComponent } from 'src/create-product/create-product.component';
import { DataService } from 'src/services/data.service';


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
        /* this.dataService.getAllIssues().
        pipe(take(1)).
        subscribe(() => {
            this.goToPage();
        })
        .unsubscribe(); */
    }

    goToPage() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(CreateProductComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}

