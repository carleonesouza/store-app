import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { User } from 'src/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/services/user.service';
import { Wallet } from 'src/models/wallet.model';
import { VendorService } from 'src/services/vendor.service';
// tslint:disable-next-line:no-duplicate-imports

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
  selector: 'wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss'],
  providers: [
     // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class WalletDialogComponent implements OnInit {
@Input() walletForm: FormGroup;
loader = true;
NUMBERPATTERN = '^[0-9.,]+$';


  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              public dialogRef: MatDialogRef<WalletDialogComponent>,
              private formBuilder: FormBuilder, private vendorService: VendorService,
              public snackBar: MatSnackBar, private userService: UserService) { }


              ngOnInit() {
                if (!this.data) {
                  this.snackBar.open('We can not get a User informations!', '', {duration: 3000});
                } else {
                  this.loader = false;
                  this.walletForm = this.formBuilder.group({
                    userName: [{value: this.data.fullName, disabled: true}],
                    userEmail: [{value: this.data.username, disabled: true}],
                    walletDay: [{value: moment(), disabled: true}],
                    entranceValue: ['', [Validators.compose([
                      Validators.required, Validators.minLength(2),
                      Validators.pattern(this.NUMBERPATTERN)])]],
                  });
                  this.walletForm.setValue({
                    userName: this.data.fullName,
                    userEmail: this.data.username,
                    walletDay: moment(),
                    entranceValue: '',
                  });

                }
              }


  get userEmail() {
    return this.walletForm.get('userEmail');
  }

  get userName() {
    return this.walletForm.get('userName');
  }

  get entranceValue() {
    return this.walletForm.get('entranceValue');
  }

  openWallet() {
    if (this.walletForm.valid.valueOf()) {
      const email = this.walletForm.get('userEmail').value;
      const day = this.walletForm.get('walletDay').value;
      const entrance = this.walletForm.value.entranceValue;
      this.userService.getUsers().subscribe((users) => {
        users.map((user) => {
          if (user.email === this.data.username) {
            const wallet = new Wallet();
            wallet.userId = user._id;
            wallet.status = true;
            wallet.createdAt = day.format();
            wallet.openValue = entrance;
            this.vendorService.onCreateWallet(wallet);
            this.dialogRef.close();
          }
        });
      });
    } else {
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }

  }

}
