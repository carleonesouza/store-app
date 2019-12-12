import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'store-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChild('start', { static: true }) start: MatSidenav;

  constructor(private router: Router, private auth: AuthService) {

  }


  navItems = [
    { name: 'Home', route: '/home', icon: 'home' },
    { name: 'Store', route: '/products/front-store', icon: 'store' },
    { name: 'Products', route: '/products/create-product', icon: 'shopping_basket' },
    { name: 'Users Panel', route: '/users', icon: 'supervised_user_circle' },
  ];


  ngOnInit() {

  }


  toggleIfMobile() {
    if (window.innerWidth < 640) {
      this.start.close();
    }
  }

  doLogOut() {
    this.auth.logout();
    this.router.navigate(['/']);
  }


}
