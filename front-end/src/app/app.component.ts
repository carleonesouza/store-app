import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'store-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChild('start', { static: true }) start: MatSidenav;

  constructor(private router: Router) { }


  navItems = [
        { name: 'Home', route: '/dashboard/home', icon: 'home' },
        { name: 'Store', route: '/dashboard/products/front-store', icon: 'store' },
        { name: 'Products', route: '/dashboard/products/create-product', icon: 'shopping_basket' },
        { name: 'Users Panel', route: '/dashboard/users', icon: 'supervised_user_circle' },
    ];


  ngOnInit() { }


  toggleIfMobile() {
    if (window.innerWidth < 640) {
        this.start.close();
    }
}


}
