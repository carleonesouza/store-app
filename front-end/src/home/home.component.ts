import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDatepicker } from '@angular/material';
import { VenderService } from 'src/services/vender.service';
import { ManagementService } from 'src/services/management.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';

import { Moment } from 'moment';

const moment = _moment;

export interface PeriodicElement {
  name: string;
  quantity: number;
  total: number;
  cash: number;
  debit: number;
  credit: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
];

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'total', 'cash', 'debit', 'credit'];
  dataSource = ELEMENT_DATA;
  loading = true;
  @Input() reportMonthForm: FormGroup;
  @Input() reportDayForm: FormGroup;
  @Input() cashierForm: FormGroup;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L'},
    {data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L'},
  ];

  public lineChartType = 'line';
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L'},
    {data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L'},
  ];

  public lineChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.loading = false;
    // this.managementService.onDataForHome();
    this.reportMonthForm = this.formBuilder.group({
      dateMonth: {value: moment(), disabled: true},
    });
    this.reportDayForm = this.formBuilder.group({
      dateDay: { value: moment().format('DD.MM.YYYY'), disabled: true}
    });
    this.cashierForm = this.formBuilder.group({
      dateNow: { value: moment().format('l'), disabled: true}
    });
    }
    chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue = this.reportMonthForm.get('dateMonth').value;
      console.log(ctrlValue);
      ctrlValue.year(normalizedYear.year());
      this.reportMonthForm.setValue({
        dateMonth: ctrlValue
      });
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.reportMonthForm.get('dateMonth').value;
      ctrlValue.month(normalizedMonth.month());
      this.reportMonthForm.setValue({
        dateMonth: ctrlValue
      });
      datepicker.close();
    }

  getTotalQuantity() {
    return this.dataSource.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
  }
  getTotalTotal() {
    return this.dataSource.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  getTotalCash() {
    return this.dataSource.map(t => t.cash).reduce((acc, value) => acc + value, 0);
  }
  getTotalDebit() {
    return this.dataSource.map(t => t.debit).reduce((acc, value) => acc + value, 0);
  }
  getTotalCredit() {
    return this.dataSource.map(t => t.credit).reduce((acc, value) => acc + value, 0);
  }

}
