import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vender } from '../../models/vender.model';
import { Product } from '../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CurrencyPipe } from '@angular/common';
import { BillMethod } from 'src/models/bill-method';
import { VenderService } from 'src/services/vender.service';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.scss'],
  providers: [CurrencyPipe]
})
export class BillDialogComponent implements OnInit, OnDestroy {
  product: Product;
  localData: Vender[];
  amount = 0;
  NUMBERPATTERN = '^[0-9.,]+$';
  approval = false;
  payableValue = 0;
  updateTotal: string;
  total = 0;
  localValue = 0;
  @Input() venderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BillDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Vender[], private venderService: VenderService,
              public dataService: DataService, public snackBar: MatSnackBar,
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

    // this.onChanges();

  }

  ngOnDestroy(): void {
    // this.onChanges();
  }

  onChanges(): void {
    let changeValue = this.total;
    this.venderForm.get('formSold').valueChanges.subscribe(val => {
      if (val > this.total) {
        this.approval = false;
        this.snackBar.open('The value typed does not be major the total', '', { duration: 3000 });
      } else if (val < this.total) {
        changeValue = this.total - val;
        console.log(changeValue);
      } else if (val === this.total) {
        this.approval = true;
        const formValue = this.currencyPipe.transform(changeValue, 'BRL', 'symbol-narrow', '1.2-2');
        this.venderForm.get('formPayable').patchValue(formValue, { emitEvent: false });
      }
    });
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
      this.venderService.onTodo(this.venderForm.get('formSold').value, typePayble);
      const formValue = this.currencyPipe.transform(this.localValue, 'BRL', 'symbol-narrow', '1.2-2');
      this.venderForm.get('formPayable').patchValue(formValue, { emitEvent: false });
      this.venderForm.get('formSold').reset();

    }

    if (this.localValue === this.total) {
      this.approval = true;
      console.log(this.venderForm.get('formSold').value);
      this.venderService.onTodo(this.venderForm.get('formSold').value, typePayble);
      const formValue = this.currencyPipe.transform(this.localValue, 'BRL', 'symbol-narrow', '1.2-2');
      this.venderForm.get('formPayable').patchValue(formValue, { emitEvent: false });
      this.dialogRef.close();
      this.venderService.getTodo().subscribe(
        (dat: BillMethod []) => {
          console.log(dat);
          this.dialogRef.disableClose = false;
        }
      );
      this.snackBar.open('The Purchase was complete successfully!!', '', { duration: 3000 });
    }
  }
}
