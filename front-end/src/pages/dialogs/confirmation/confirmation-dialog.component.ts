import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Vendor } from 'src/models/vendor.model';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { VendorService } from 'src/services/vendor.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'confirmation.dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'quantity', 'total', 'actions'];
    loading = true;
    dataSource = new MatTableDataSource<Vendor>();
    private subscription: Subscription;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vendor[], private vendorService: VendorService,
                public productService: ProductService, private dialog: MatDialog, private router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
      if (this.data != null) {
          this.dataSource.data = this.data;
          this.subscription = this.productService.onBackVendor().subscribe();
          this.dataSource.data.map((vendor) => {
            this.loading = false;
            this.productService.getProductById(vendor.productId).subscribe(
                (base) => {
                    vendor.name = base.name;
                }
            );
        });
      }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onConfirmation(): void {
        if (this.data.length !== 0) {
            this.data.map((vendor) => {
                this.vendorService.onAddVendorsAWallet(vendor);

                this.dialogRef.close();
                this.dialogRef.afterClosed().subscribe(() => {
                this.dialog.open(BillDialogComponent, {
                    data: vendor,
                    disableClose: true,
                });

            });
        });
        } else {
            this.snackBar.open('You must confirm just when have a product selected !', null, {duration: 4000});
            this.dialogRef.close();
        }
      }

      onDelete(vendor: Vendor) {
        if (vendor != null) {
            const index = this.dataSource.data.indexOf(vendor);
            this.dataSource.data.splice(index, 1);
            this.dataSource = new MatTableDataSource<Vendor>(this.dataSource.data);
            this.productService.onCleanListVendor(vendor);
            if (this.dataSource.data.length === 0) {
                this.dialogRef.close();
            }

        }

      }


}
