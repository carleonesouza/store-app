import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, OnDestroy} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vender } from '../../models/vender.model';
import { Product } from '../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.scss'],
  providers: [CurrencyPipe]
})
export class BillDialogComponent implements OnInit, OnDestroy {
  product: Product;
  localData: Vender [];
  amount = 0;
  updateTotal;
  total = 0;
  valueTyped;
  @Input() venderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BillDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Vender [],
              public dataService: DataService, public snackBar: MatSnackBar,
              private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe) {
                this.onCreateForm();
               }

  ngOnInit() {
    this.data.map( (e) => {
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

    this.onChanges();

  }

  ngOnDestroy(): void {
    this.onChanges();
  }

  onChanges(): void {
    let localValue = this.total;
    this.venderForm.get('formSold').valueChanges.subscribe(val => {
      localValue = this.total - val;
      console.log(localValue);
      this.venderForm.get('formPayable').patchValue(localValue, {emitEvent: false});
      });
  }

  onCreateForm() {
    const numberPatern = '^[0-9.,]+$';
    this.venderForm = this.formBuilder.group({
      formAmount: [{value: '', disabled: true }, [
        Validators.pattern(numberPatern)]],
      formSold: ['', [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern(numberPatern)])]],
      formTotal: [{value: '', disabled: true }, [
        Validators.pattern(numberPatern)]],
        formPayable: [{value: '', disabled: true }, [
          Validators.pattern(numberPatern)]],
    });
  }


  get f() { return this.venderForm.controls; }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.venderForm.valid.valueOf()) {
      const sold = this.venderForm.value.formSold;
      console.log(sold);
      /* const productId = this.data.productId;
      const amount = this.venderForm.value.formAmount;
      const total = this.venderForm.value.formTotal;
      const sold = this.venderForm.value.formSold;
      const saveVender = { productId, amount, total, sold };
      console.log(saveVender); */
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
