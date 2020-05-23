import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductService } from '.././../services/product.service';
import { Product } from 'src/models/product.model';
import { Quantity } from 'src/models/quantity.model';
import { ConfirmationDialogComponent } from '../dialogs/confirmation/confirmation-dialog.component';
import { Vendor } from 'src/models/vendor.model';

@Component({
  selector: 'front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
})

export class FrontStoreComponent implements OnInit, OnDestroy {

  sellProducts = [];
  data: Vendor[];
  @Input() sellQuantity: Quantity[];
  loading = true;



  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
              private productService: ProductService) {
    this.data = [];
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        (data: Product[]) => {
          this.sellProducts = data,
            this.loading = false;
        },
        () => this.snackBar.open('Sorry, occurred an error, try later', null, { duration: 3000 })
      );

  }

  ngOnDestroy(): void {
    this.productService.onBackVendor().subscribe().unsubscribe();
  }

  addAmount(product: Product)  {
      if (isNaN(product.quantity)) {
       product.quantity = 0;
       this.productService.changeQuantity(product);
       return;
      } else {
        this.productService.changeQuantity(product);
        return;
      }

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
      this.snackBar.open('Sorry, you have to select a product!', null, { duration: 3000 });
    }
  }

}
