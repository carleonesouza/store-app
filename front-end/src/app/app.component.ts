import {
  Component,
  ViewEncapsulation,
  OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  navItems = [
    { name: 'Home', route: '/', icon: 'home' },
    { name: 'Store', route: '/front-store', icon: 'store' },
    { name: 'Product', route: '/create-product', icon: 'shopping_basket' },
  ];


  ngOnInit() { }
}
