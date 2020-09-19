import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-store',
  templateUrl: './snack-bar-store.component.html',
  styleUrls: ['./snack-bar-store.component.scss']
})
export class SnackBarStoreComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarStoreComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {}


}
