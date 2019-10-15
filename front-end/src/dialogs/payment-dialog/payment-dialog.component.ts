import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Vender } from '../../models/vender';
import { Product } from '../../models/product';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { from } from 'rxjs';
import { VenderService } from 'src/services/vender.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  product: Product;
  localData: any;
  @Input() venderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public dataService: DataService, public snackBar: MatSnackBar,
              private formBuilder: FormBuilder, private venderService: VenderService) { }

  ngOnInit() {
    console.log(this.data);
    this.venderForm = this.formBuilder.group({
      formName: [{ value: this.data.name, disabled: true }, [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]],
      formAmount: [{ value: this.dataService.getAmount(), disabled: true }, [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]],
      formSold: [this.data.price, [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]],
      formTotal: [{ value: '', disabled: true }, [Validators.compose([
        Validators.required, Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]],
    });
  }


  get f() { return this.venderForm.controls; }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.venderForm.valid.valueOf()) {
      const productId = this.data._id;
      const nameProduct = this.venderForm.value.formName;
      const amount = this.venderForm.value.formAmount;
      const total = this.venderForm.value.formTotal;
      const sold = this.venderForm.value.formSold;
      const saveVender = { productId, nameProduct, amount, total, sold };
      console.log(saveVender);
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
