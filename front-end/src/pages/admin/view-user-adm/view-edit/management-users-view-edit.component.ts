import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { StoreAppService } from 'src/services/store-app.service';

@Component({
    selector: 'dialog-management-users-view-edit',
    templateUrl: './management-users-view-edit.component.html',
    styleUrls: ['../management-users.component.scss']
})
export class ManagementUsersViewEditComponent implements OnInit {
    public working = true;
    public error = false;
    public notFound = false;
    public create = false;
    private wasDeleted = false;

    public user: any;
    public email = undefined;
    public allowed = undefined;
    public sessionId = undefined;
    public role = undefined;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<ManagementUsersViewEditComponent>,
                private changeDetectorRef: ChangeDetectorRef,
                private StoreApp: StoreAppService,
                private auth: AuthService,
                private snackBar: MatSnackBar,
                private router: Router) { }

    ngOnInit() {
        this.dialogRef.afterClosed().subscribe(() => {
            if (!this.wasDeleted) {
                history.pushState(null, 'Management Users', '/users');
            }
        });

        if (this.data.create) {
            this.working = false;
            this.user = { };
            this.create = this.data.create;
            this.changeDetectorRef.detectChanges();
        } else {
            this.loadData();
        }
    }

    loadData() {
        this.error = false;
        this.working = true;
        this.notFound = false;

        this.StoreApp.fetchGenericDataList('/users')
            .subscribe(result => {
                this.working = false;

                if (result.count === 0 || result.data.length === 0) {
                    this.notFound = true;
                } else {
                    this.onUserLoaded(result.data[0]);
                }
            }, err => {
                console.error(err);
                this.working = false;
                this.error = true;
            });
    }

    onUserLoaded(data) {
        this.user = data;
        this.email = this.user.id;
        this.allowed = String(this.user.allowed);
        this.role = this.user.role;
        this.sessionId = this.user.sessionId;
        this.changeDetectorRef.detectChanges();
    }

    save() {
        this.working = true;
        const id = this.create ? this.email : this.data.id;

        if (id === this.auth.email) {
            if (!confirm('Are you sure you want to edit your own account? ' +
                'You may lose access to Management Panel depending of the settings you\'ve changed.')) {
                this.working = false;
                return;
            }
        }

        this.StoreApp.postGenericAction(`users/${id}`, {
            allowed: this.allowed === 'true',
            role: this.role,
            sessionId: this.sessionId
        })
        .subscribe(result => {
            if (this.create) {
                this.wasDeleted = true;
                this.dialogRef.close();
                this.snackBar.open('User created successfully!', null, { duration: 5000 });
                this.router.navigate(['/admin/management-users/', result.data.id]);
            } else {
                this.working = false;
                this.onUserLoaded(result.data);
                this.snackBar.open('User updated successfully!', null, { duration: 5000 });
            }
        }, () => {
            this.working = false;
            this.snackBar.open('Failed to update this user!', null, { duration: 5000 });
        });
    }

    delete() {
        alert('For security purposes, this feature is disabled. ' +
        'Please contact a developer if you want to remove completly an user from Management Panel. ' +
        'In case of access removal, you can set the role to Disabled or panel access to Disallowed.');
    }

    sessionIdHelp() {
        alert('This parameter holds the identifier of the current session of the user. ' +
        'By changing this parameter to any other than the current value, you\'ll invalidate ' +
        'the current sesion of the user, causing a sign out and forcing the user to sign in again.');
    }
}
