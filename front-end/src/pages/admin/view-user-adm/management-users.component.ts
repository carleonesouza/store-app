import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


import { ManagementUsersViewEditComponent } from './view-edit/management-users-view-edit.component';
import { GenericDataSource } from 'src/datasources/generic-datasource';
import { StoreAppService } from 'src/services/store-app.service';

@Component({
    selector: 'page-management-users',
    templateUrl: './management-users.component.html'
})
export class ManagementUsersComponent implements OnInit, AfterViewInit {
    public errored = false;
    public dataSource: GenericDataSource;
    displayedColumns = ['avatar', 'name', 'email', 'promoCode', 'role', 'id'];

    @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
    @ViewChild('input', { static: true}) input: ElementRef;

    constructor(public Mtor: StoreAppService,
                private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.dataSource = new GenericDataSource();
        this.dataSource.setCallback((filter, pageIndex, pageSize) => {
            return this.Mtor.fetchGenericDataList('/users', filter, pageIndex, pageSize);
        });

        this.dataSource.setErrorHandler((err) => {
            this.errored = true;
            this.snackBar.open('Failed to load users!', 'RETRY', { duration: 5000 })
                .onAction().subscribe(() => {
                    this.loadUsersPage();
                });
        });

        this.dataSource.loadData('', 0, 25);

        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.dialog.open(ManagementUsersViewEditComponent, { data: { id: params.id } });
            }
        });
    }

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadUsersPage();
                })
            )
            .subscribe();

        this.paginator.page.subscribe(() => {
            this.loadUsersPage();
        });
    }

    loadUsersPage() {
        this.errored = false;
        this.dataSource.loadData(
            this.input.nativeElement.value,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    viewUser(id: String) {
        history.pushState(null, `View User: #${id}`, `/user/${id}`);
        this.dialog.open(ManagementUsersViewEditComponent, { data: { id } });
    }

    formatRole(role: any) {
        if (typeof role !== 'string' && typeof role !== 'number') {
            return '- invalid user -';
        }

        switch (role) {
            case 0:
            case '0':
                return 'Student (0)';

            case 50:
            case '50':
                return 'Tutor (MB) (50)';

            case 51:
            case '51':
                return 'Tutor (MA) (51)';

            default:
                return `Unknown (${role})`;
        }
    }
}
