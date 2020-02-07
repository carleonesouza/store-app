import {Component, OnInit, Input, OnDestroy} from '@angular/core';
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
        () => this.snackBar.open('Sorry, occurred an error, try later', '', {
          duration: 3000,
        })
      );

  }

  ngOnDestroy(): void {
  this.productService.onBackVender().subscribe().unsubscribe();
  }

  addAmount(product: Product) {
    this.productService.changeQuantity(product);
  }

  onClean(product: Product) {
    this.productService.onCleanQuantity(product).subscribe((p) => {
      if (p.quantity === 0) {
        this.snackBar.open('The quantity is 0 already!', '', {
          duration: 3000,
        });
      }
    });
  }

  openDialog(): void {
    this.productService.onBackVender().subscribe((v: Vendor[]) => {
    this.data = v;
    });
    if (this.data !== null) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: this.data
      });
      dialogRef.afterClosed().subscribe(() => {
        this.data.pop();
      });
    } else {
      this.snackBar.open('Sorry, you have to select a product!', '', {
        duration: 3000,
      });
    }
  }

}
