import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material';
import { Vendor } from 'src/models/vendor.model';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { VendorService } from 'src/services/vendor.service';
import { Router } from '@angular/router';

@Component({
    selector: 'confirmation.dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'quantity', 'total', 'actions'];
    dataSource: Vendor[];
    loading = true;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vendor[], private vendorService: VendorService,
                public productService: ProductService, private dialog: MatDialog, private router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.data.map((vendor) => {
            this.loading = false;
            this.productService.getProductById(vendor.productId).subscribe(
                (base) => {
                    vendor.name = base.name;
                }
            );
        });
    }

    ngOnDestroy(): void {
        }

    onCancel(): void {
        this.dialogRef.close();
        this.router.navigate(['/home']);
    }

    onConfirmation(): void {
        if (this.data.length !== 0) {
            this.data.map((vendor) => {
            this.vendorService.onAddVendorsAWallet(vendor);
            });
            this.dialog.open(BillDialogComponent, {
                data: this.data,
                disableClose: true,
            });
            this.dialogRef.close();
        } else {
            this.snackBar.open('You must confirm just when have a product selected !', '', {duration: 4000});
            this.dialogRef.close();
        }
      }

      onDelete(vendor: Vendor) {
          this.data = this.data.filter(e => e.productId === vendor.productId);
          console.log(this.data);
          // this.dataSource = this.dataSource.filter(e => e.name === vendor.name);

      }

}
