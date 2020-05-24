import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';


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
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { GenericDataSource } from 'src/datasources/generic-datasource';
import { StoreAppService } from 'src/services/store-app.service';
import { from } from 'rxjs';



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

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HomeComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['name', 'quantity', 'total'];
  displayedColumns2: string[] = ['method', 'value'];
  displayedColumns3: string[] = ['name', 'description', 'value'];
  displayedColumnsWallet = ['date', 'open', 'close', 'total'];
  exampleDatabase: VendorService | null;
  dataSource: HomeDataSource | null;
  user = new User();
  dataMethod: BillDataSource | null;
  public errored = false;
  public dataSour: GenericDataSource;
  loading = true;
  walletOpen = false;
  total = 0;
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
              private vendorService: VendorService,
              private StoreApp: StoreAppService) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild('input', {static: true}) input: ElementRef;

  ngOnInit() {
    if (this.auth.authenticated) {
      this.loading = false;
      this.user.fullName = this.auth.name;
      this.user.username = this.auth.email;
    } else {
      this.loading = true;
    }
    this.onCheckWallet();

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

    this.dataSour = new GenericDataSource();
    this.dataSour.setCallback((filter, pageIndex, pageSize) => {
        return this.StoreApp.fetchGenericDataList('/wallets', filter, pageIndex, pageSize);
    });

    this.dataSour.setErrorHandler((err) => {
        this.errored = true;
        this.snackBar.open('Failed to load wallets!', 'RETRY', { duration: 5000 })
            .onAction().subscribe(() => {
                this.loadPage();
            });
    });

    this.dataSour.loadData('', 0, 25);

  }

  ngAfterContentInit() {
    this.loadData();
    this.loadDataMethod();
  }

  refresh() {
    this.loadData();
    this.loadDataMethod();
  }

  loadPage() {
    this.errored = false;
    this.dataSour.loadData(
        this.input.nativeElement.value,
        this.paginator.pageIndex,
        this.paginator.pageSize);
}


  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value).locale('pt-br').format('L');
  }

  onCheckWallet() {
    if (!localStorage.getItem('userOpenId')) {
      this.vendorService.onCheckWallets().subscribe((wallets) => {
        wallets.map((wallet) => {
          if (wallet.finishValue === 0) {
            this.snackBar.open('Still there a wallet open that you have to close!', '', { duration: 3000 });
            localStorage.setItem('userOpenId', wallet.userId);
            localStorage.setItem('walletId', wallet._id);
          } else {
            this.openCashier();
          }
        });
      });
    } else {
      this.walletOpen = true;
      this.vendorService.onCheckWallets().subscribe((wallets: Wallet[]) => {
        wallets.map((wallet) => {
          const day = moment(wallet.createdAt);
          day.locale('pt-br').format('L');
          if (wallet === null) {
            this.walletOpen = false;
            this.loading = true;
          } else if (day.locale('pt-br').format('L') === this.today) {
            this.walletOpen = wallet.status;
            this.vendorService.getAWalletVendor(wallet);
          }
        });
      });
    }
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
      this.dialog.open(WalletDialogComponent, { data: this.user })
        .afterClosed()
        .subscribe(() => {
          this.vendorService.onCheckWallets().subscribe((wallets: Wallet[]) => {
            wallets.map((wallet) => {
              const day = moment(wallet.createdAt);
              if (wallet === null) {
                this.walletOpen = false;
                this.loading = true;
              } else if (day.locale('pt-br').format('L') === this.today && wallet.finishValue === 0) {
                this.walletOpen = wallet.status;
                localStorage.setItem('userOpenId', wallet.userId);
                localStorage.setItem('walletId', wallet._id);
              }
            });
          });
        });
    }
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
