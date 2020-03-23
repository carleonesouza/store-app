import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { User } from 'src/models/user.model';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/services/user.service';
import { Wallet } from 'src/models/wallet.model';
import { VendorService } from 'src/services/vendor.service';
import { CurrencyPipe } from '@angular/common';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'close-cashier-dialog',
  templateUrl: './close-cashier-dialog.component.html',
  styleUrls: ['./close-cashier-dialog.component.scss'],
  providers: [
    CurrencyPipe,
     // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: LOCALE_ID,
      useValue: 'BRL' // 'de' for Germany, 'fr' for France ...
     },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CloseCashierDialogComponent implements OnInit {
@Input() walletForm: FormGroup;
loader = true;
user: User;
vlr = 0;

NUMBERPATTERN = '^[0-9.,]+$';


  constructor(@Inject(MAT_DIALOG_DATA) public data: Wallet,
              public dialogRef: MatDialogRef<CloseCashierDialogComponent>,
              private currencyPipe: CurrencyPipe,
              private formBuilder: FormBuilder, private vendorService: VendorService,
              public snackBar: MatSnackBar, private userService: UserService) { }


              ngOnInit() {
                if (!this.data) {
                  this.snackBar.open('We cannot get a User informations!', '', {duration: 3000});
                } else {
                  this.loader = false;

                  this.walletForm = this.formBuilder.group({
                    openAt: [{value: moment(this.data.createdAt).locale('pt-br').format('L'), disabled: true}],

                    typedValue: ['', [Validators.compose([
                        Validators.required, Validators.minLength(2),
                        Validators.pattern(this.NUMBERPATTERN)])]],

                    closeAt: [{value: moment(), disabled: true}],

                    finishValue: [{ value: this.data.openValue, disabled: true },
                    [Validators.pattern(this.NUMBERPATTERN)]],
                  });

                  this.walletForm.setValue({
                    openAt: moment(this.data.createdAt).locale('pt-br').format('L'),
                    typedValue: '',
                    closeAt: moment(),
                    finishValue:
                    this.currencyPipe.transform(this.data.openValue, 'BRL', 'symbol-narrow', '1.2-2', 'pt-BR'),
                  });

                  this.walletForm.get('typedValue').valueChanges.subscribe((valor) => {
                    this.onChange(valor);
                  });

                }
              }

  onChange(valor: number) {
    const total = valor + this.data.openValue;
    const formValue = this.currencyPipe.transform(total, 'BRL', 'symbol-narrow', '1.2-2', 'pt-BR');
    this.walletForm.get('finishValue').patchValue(formValue, { emitEvent: false });

  }

  get openAt() {
    return this.walletForm.get('openAt');
  }

  get typedValue() {
    return this.walletForm.get('typedValue');
  }

  get finishValue() {
    return this.walletForm.get('finishValue');
  }

  closeWallet() {
    if (this.walletForm.valid.valueOf()) {
      const closeAt = this.walletForm.get('closeAt').value;
      const typedValue = this.walletForm.value.typedValue;
      const total = typedValue + this.data.openValue;
      const formValue = this.currencyPipe.transform(total, 'BRL', 'symbol-narrow', '1.2-2', 'pt-BR');
      this.walletForm.get('finishValue').patchValue(formValue, { emitEvent: false });
      this.vendorService.getAWallet(this.data).subscribe((item) => {
        if (!item) {
          this.snackBar.open('Error during processing your request!', '', { duration: 3000 });
        } else {
          item.closeAt = closeAt.format();
          item.finishValue = typedValue;
          this.vendorService.onCloseAWallet(item);
          this.dialogRef.afterClosed().subscribe(() => {
            localStorage.removeItem('userOpenId');
          });

        }
        this.dialogRef.close();
      });
      this.dialogRef.disableClose = true;
    } else {
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }

  }

}
