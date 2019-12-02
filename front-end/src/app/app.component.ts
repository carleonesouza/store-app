import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChild('start', { static: true }) start: MatSidenav;


  navItems = [
        { name: 'Home', route: '/dashboard/home', icon: 'home' },
        { name: 'Store', route: '/dashboard/products/front-store', icon: 'store' },
        { name: 'Products', route: '/dashboard/products/create-product', icon: 'shopping_basket' },
        { name: 'Management Panel Users', route: '/dashboard/users', icon: 'account-settings-variant' },
    ];

/*
    vendor: [
        { name: 'Students', route: '/vendor/students', icon: 'account' },
        { name: 'Tutors', route: '/vendor/tutors', icon: 'teach' },
        { name: 'Class History', route: '/vendor/classes', icon: 'history' },
        { name: 'Pricing and Earnings', route: '/vendor/earnings', icon: 'currency-usd' },
        { name: 'Subjects', route: '/vendor/subjects', icon: 'school' },
    ] */


  ngOnInit() { }


  toggleIfMobile() {
    if (window.innerWidth < 640) {
        this.start.close();
    }
}


}
