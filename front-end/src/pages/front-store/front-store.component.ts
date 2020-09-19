import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '.././../services/product.service';
import { Product } from 'src/models/product.model';
import { Quantity } from 'src/models/quantity.model';
import { ConfirmationDialogComponent } from '../dialogs/confirmation/confirmation-dialog.component';
import { Vendor } from 'src/models/vendor.model';
import { SnackBarStoreComponent } from '../snack-bar-store/snack-bar-store.component';
import { FormControl } from '@angular/forms';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
})

export class FrontStoreComponent implements OnInit, OnDestroy {

  sellProducts = [];
  categories: Category[];
  loading = true;
  data: Vendor[];
  message= {message: 'error'}
  @Input() sellQuantity: Quantity[];


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router,
    private productService: ProductService, private storeAppService: StoreAppService) {
    this.data = [];
    this.categories=[];
  }

  ngOnInit() {
    this.storeAppService.getGenericAction('/categories').pipe().subscribe(
      (categories: Category[]) => {
        this.storeAppService.getGenericAction('/products').pipe()
      .subscribe(
        (data: Product[]) => {
          this.sellProducts = data,
          this.categories=categories,
          this.loading = false;
        },
        () => this.snackBar.open('Sorry, occurred an error, try later', null, { duration: 3000 })
      );
    });

  }

  ngOnDestroy(): void {
    this.productService.onBackVendor().subscribe().unsubscribe();
  }

  addAmount(product: Product) {
    if (isNaN(product.quantity)) {
      product.quantity = 0;
      this.productService.changeQuantity(product);
      return;
    } else {
      this.productService.changeQuantity(product);
      return;
    }

  }

  onSelect(element){
    console.log(element);
  }

  productDetails(product){
    ;
  // this.router.navigate(['/products:id'], product);
  }

  onClean(product: Product) {
    this.productService.onCleanList(product).subscribe((p) => {
      if (p.quantity === 0) {
        this.snackBar.open('The quantity is 0 already!', null, { duration: 3000 });
      }
    });
  }

  openDialog(): void {
    this.productService.onBackVendor().subscribe((vendor: Vendor[]) => {
      vendor.map((p) => {
        if (p.amount !== 0) {
          this.data.push(p);
        }
      });
    });
    if (this.data.some(e => e.amount !== 0)) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: this.data
      });
    } else {
      this.snackBar.openFromComponent(SnackBarStoreComponent, {
        data: this.message  });
    }

  }
}
