import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { MatPaginator, MatSort, MatDatepickerInputEvent, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
import { ManagementService } from 'src/services/management.service';
import { HomeDataSource } from 'src/services/home-data-source';
import { ProductService } from 'src/services/product.service';
import { VendorService } from 'src/services/vendor.service';
import { BillDataSource } from 'src/services/bill-data-source';
import { WalletDialogComponent } from '../dialogs/wallet-dialog/wallet-dialog.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';



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
  selector: 'home',
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
export class HomeComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['name', 'quantity', 'total'];
  displayedColumns2: string[] = ['method', 'value'];
  displayedColumns3: string[] = ['name', 'description', 'value'];
  exampleDatabase: VendorService | null;
  dataSource: HomeDataSource | null;
  user = new User();
  dataMethod: BillDataSource | null;
  loading = true;
  walletOpen = false;
  today = new Date().toLocaleDateString();
  @Input() reportDayForm: FormGroup;
  @Input() cashierForm: FormGroup;
  @Input() dateValue: string;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private formBuilder: FormBuilder, private managementService: ManagementService,
              private snackBar: MatSnackBar, public httpClient: HttpClient, private dialog: MatDialog,
              private productService: ProductService, private auth: AuthService,
              private vendorService: VendorService) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.onCheckWallet();
    if (this.auth.authenticated) {
      this.loading = false;
      this.user.fullName = this.auth.name;
      this.user.username = this.auth.email;
    } else {
      this.loading = true;
    }
    this.reportDayForm = this.formBuilder.group({
      dateDay: { value: '', disabled: true }
    });
    this.cashierForm = this.formBuilder.group({
      dateNow: { value: this.today, disabled: true }
    });
    this.managementService.onVenderHome(this.today);
    this.cashierForm.setValue({
      dateNow: this.today,
    });

  }

  ngAfterContentInit() {
    this.loadData();
    this.loadDataMethod();
}

  refresh() {
    this.loadData();
    this.loadDataMethod();
  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value).locale('pt-br').format('l');
  }

  onCheckWallet() {
    this.vendorService.onCheckWallet(this.today).subscribe((wallet) => {
      console.log(wallet.status);
    });
  }

  onGenerate() {
    if (!this.dateValue) {
      this.snackBar.open('You have to choose a date', '', { duration: 3000 });
    } else {
      this.managementService.onDataForHome(this.dateValue);
      this.managementService.onVenderHome(this.dateValue);
    }
  }

  openCashier() {
    if (this.user) {
      this.dialog.open(WalletDialogComponent, {data:  this.user })
      .afterClosed()
      .subscribe(() => {
        this.walletOpen = true;
      });
    }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(WalletDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


public loadData() {
  this.exampleDatabase = new VendorService(this.httpClient, this.snackBar, this.productService);
  this.dataSource = new HomeDataSource(this.exampleDatabase, this.paginator, this.sort);
}

public loadDataMethod() {
  this.exampleDatabase = new VendorService(this.httpClient, this.snackBar, this.productService);
  this.dataMethod = new BillDataSource(this.exampleDatabase, this.paginator, this.sort);
}

}
