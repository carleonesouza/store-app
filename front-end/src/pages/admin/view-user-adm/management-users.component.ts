import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator, MatSnackBar, MatDialog, MatSort } from '@angular/material';
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
    displayedColumns = ['avatar', 'name', 'email', 'role'];

    @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('input', { static: true}) input: ElementRef;

    constructor(public StoreApp: StoreAppService,
                private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.dataSource = new GenericDataSource(this.paginator, this.sort);
        this.dataSource.setCallback((filter, pageIndex, pageSize) => {
            return this.StoreApp.fetchGenericDataList('/users', filter, pageIndex, pageSize);
        });



        this.dataSource.setErrorHandler((err) => {
            this.errored = true;
            this.snackBar.open('Failed to load management panel users!', 'RETRY', { duration: 5000 })
                .onAction().subscribe(() => {
                    this.loadManagementPanelUsersPage();
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
                    this.loadManagementPanelUsersPage();
                })
            )
            .subscribe();

        this.paginator.page.subscribe(() => {
            this.loadManagementPanelUsersPage();
        });
    }

    loadManagementPanelUsersPage() {
        this.errored = false;
        this.dataSource.loadData(
            this.input.nativeElement.value,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    viewManagementPanelUser(id: string) {
        history.pushState(null, `View Management User: #${id}`, `/admin/management-users/${id}`);
        this.dialog.open(ManagementUsersViewEditComponent, { data: { id } });
    }

    createUser() {
        this.dialog.open(ManagementUsersViewEditComponent, { data: { create: true } });
    }

    capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

}
