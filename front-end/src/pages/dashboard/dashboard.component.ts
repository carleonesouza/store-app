import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StoreAppService } from '../../services/store-app.service';

@Component({
    selector: 'page-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    fallback = false;
    loading = true;
    error = false;
    data = {};

    constructor(private auth: AuthService,
                private storeApp: StoreAppService) { }

    ngOnInit() {
        switch (this.auth.role) {
            case 'admin':
                this.onAdminInit();
                break;

            case 'vendor':
                this.onVendorInit();
                break;

            default:
                this.fallback = true;
                this.loading = false;
                break;
        }
    }

    onAdminInit() {
        this.loading = true;
        this.error = false;
        this.data = {};

        this.storeApp.getGenericAction('/stats')
            .subscribe(res => {
                this.loading = false;
                res.datastore.forEach(el => this.data[el.kind_name] = el);
            }, err => {
                console.error(err);
                this.error = true;
            });
    }

    onVendorInit() {
        this.loading = false;
        this.error = false;
        this.data = {};
    }
}
