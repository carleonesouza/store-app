import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Vendor } from '../../models/vendor.model';
import { Product } from '../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CurrencyPipe } from '@angular/common';
import { BillMethod } from 'src/models/bill-method';
import { VendorService } from 'src/services/vendor.service';
import { BagVenders } from 'src/models/bag-venders';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.scss'],
  providers: [CurrencyPipe]
})
export class BillDialogComponent implements OnInit, OnDestroy {
  product: Product;
  localData: Vendor[];
  amount = 0;
  NUMBERPATTERN = '^[0-9.,]+$';
  approval = false;
  payableValue = 0;
  updateTotal: string;
  total = 0;
  localValue = 0;
  @Input() venderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BillDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Vendor[], private venderService: VendorService,
              public productService: ProductService, public snackBar: MatSnackBar, private bagVenders: BagVenders,
              private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe) {
    this.onCreateForm();
  }

  ngOnInit() {
    this.data.map((e) => {
      this.amount = e.amount + this.amount;
      this.total = e.total + this.total;
      this.updateTotal = this.currencyPipe.transform(this.total, 'BRL', 'symbol-narrow', '1.2-2');
    });

    this.venderForm.setValue({
      formAmount: this.amount,
      formSold: '',
      formTotal: this.updateTotal,
      formPayable: ''
    });

  }

  ngOnDestroy(): void {

  }

  onCreateForm() {
    this.venderForm = this.formBuilder.group({

      formAmount: [{ value: '', disabled: true }, [
        Validators.pattern(this.NUMBERPATTERN)]],

      formSold: ['', [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern(this.NUMBERPATTERN)])]],

      formTotal: [{ value: '', disabled: true }, [
        Validators.pattern(this.NUMBERPATTERN)]],
      formPayable: [{ value: '', disabled: true }, [
        Validators.pattern(this.NUMBERPATTERN)]],
    });
  }


  get venderControlsForm() {
    return this.venderForm.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(typePayble: string) {

    if (this.venderForm.get('formSold').value > this.total) {
      this.approval = false;
      this.dialogRef.disableClose = true;
      this.snackBar.open('The value typed does not be major the total', '', { duration: 3000 });
    }

    this.localValue = this.localValue + this.venderForm.get('formSold').value;

    if (this.localValue < this.total ) {
      this.dialogRef.disableClose = true;
      this.approval = false;
      this.venderService.onBillMethod(this.venderForm.get('formSold').value, typePayble);
      const formValue = this.currencyPipe.transform(this.localValue, 'BRL', 'symbol-narrow', '1.2-2');
      this.venderForm.get('formPayable').patchValue(formValue, { emitEvent: false });
      this.venderForm.get('formSold').reset();

    }

    if (this.localValue === this.total) {
      this.approval = true;
      this.venderService.onBillMethod(this.venderForm.get('formSold').value, typePayble);
      const formValue = this.currencyPipe.transform(this.localValue, 'BRL', 'symbol-narrow', '1.2-2');
      this.venderForm.get('formPayable').patchValue(formValue, { emitEvent: false });
      this.dialogRef.close();
      this.venderService.onGetBillMehthod().subscribe(
        (methods: BillMethod []) => {
           methods.map((method) => {
             this.venderService.addABMethod(method);
           }),
          this.dialogRef.disableClose = false;
        }
      );
      this.snackBar.open('The Purchase was complete successfully!!', '', { duration: 3000 });
    }
  }
}
