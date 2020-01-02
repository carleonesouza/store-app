import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProductService } from '../../../../services/product.service';
import { HandleError } from '../../../../services/handleError';
import { EditUserDialogComponent } from '../edit/edit-user-dialog.component';

export interface User {
  name: string;
  email: string;
  role: string;
  status: boolean;
}

const ELEMENT_DATA: User[] = [
  {name: 'Carleone', email: 'carleone@gmail.com', role: 'seller', status: true},
  {name: 'Fernando', email: 'fernando@gmail.com', role: 'seller', status: false},
  {name: 'Denise', email: 'denise@gmail.com', role: 'admin', status: true},
];

@Component({
  selector: 'view-user-adm',
  templateUrl: './view-user-adm.component.html',
  styleUrls: ['./view-user-adm.component.scss']
})
export class ViewUserAdmComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'status', 'actions'];
  exampleDatabase: any;
  snackBar: MatSnackBar |null;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  status: boolean;
  activeText: string;
  checked;
  disabled;


  constructor(public httpClient: HttpClient, public dialog: MatDialog,
              public productService: ProductService, private myHandleError: HandleError) { }

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild('filter', { static: true }) filter: ElementRef;

ngOnInit() {
  this.dataSource.paginator = this.paginator;
}


  refresh() {
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user},
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(user);
    });

  }

}
