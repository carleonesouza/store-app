import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


export interface User {
  name: string;
  email: string;
  role: string;
  status: boolean;
}


@Component({
  selector: 'edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  action: string;
  localData: any;
  localUser: User;
  @Input() userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public productService: ProductService, public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
                this.localUser = this.data;
               }

              ngOnInit() {
                this.userForm = this.formBuilder.group({
                  name: ['', [Validators.required, Validators.minLength(3)]],
                  role: ['', [Validators.required, Validators.minLength(3)]],
                });
                this.userForm.setValue(
                  {
                    name: this.localUser.name,
                    role: this.localUser.role,
                  }
                );
              }


  get userName() {
    return this.userForm.get('name');
  }

  get userRole() {
    return this.userForm.get('role');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    if (this.userForm.valid.valueOf()) {
      const name = this.userForm.value.userName;
      const role = this.userForm.value.userRole;
      console.log(name + ' ' + role );
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
