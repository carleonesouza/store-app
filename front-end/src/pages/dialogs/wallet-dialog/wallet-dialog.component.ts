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
// tslint:disable-next-line:no-duplicate-imports

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'L/MM/YYYY',
  },
  display: {
    dateInput: 'L/MM/YYYY',
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<WalletDialogComponent>,
              private formBuilder: FormBuilder) { }


              ngOnInit() {
                this.walletForm = this.formBuilder.group({
                  userName: [''],
                  userEmail: [''],
                  walletDay: [{value: moment()}],
                  entranceValue: ['', [Validators.required, Validators.minLength(2)]],
                });
                console.log(moment());
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

}
