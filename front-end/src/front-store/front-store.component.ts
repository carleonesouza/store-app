import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product';


@Component({
  selector: 'app-dialog',

  styleUrls: ['./front-store.component.scss']
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('hidden', style({
        opacity: '0',
      })),
      state('show', style({
        opacity: '1',
        transform: 'translateY(-10%)'
      })),
      transition('hidden => show', animate('10ms ease-in')),
    ]),
  ]
})
export class FrontStoreComponent implements OnInit {
  sellProducts = [];
  sellProduct: Product;
  condition: boolean;
  state = 'hidden';
  show = false;
  amount = 0;
  productAmount = 0;
  test = [];
  id: any;
  errorMsg: any;
  updateProductForm: FormGroup;


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder,
              private dataService: DataService) {
    this.createForm();
  }

  ngOnInit() {
   /*  this.storeService.getProducts()
      .subscribe(
        (data: Product[]) => this.sellProducts = data,
        error => this.errorMsg = error
      );

    this.storeService.getProducts().subscribe( res => {
        res.map((item) => {
          this.id = item._id;
        });
      }); */

  }

  private createForm() {
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: '',
      description: ['', Validators.required]
    });
  }


  openSnackBar() {
    this.snackBar.open('Payment complent Successfully !!', '', {
      duration: 3000,
    });
  }

  add() {
    this.condition = true;
    console.log('clicado');
  }

  animateMe() {
    this.state = (this.state === 'hidden' ? 'show' : 'hidden');
    if (this.state === 'hidden') {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  addAmount() {
    if (this.amount >= 0) {
      this.productAmount += this.amount + 1;
    }
  }

  onClear() {
    if (this.amount > 0) {
      this.amount = this.amount - 1;
    } else {
      this.snackBar.open('Amount is already 0!', '', {
        duration: 3000,
      });
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

