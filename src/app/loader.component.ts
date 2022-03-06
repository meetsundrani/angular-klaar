import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-loader',
  template: `<div class="overlay" *ngIf="visiblity">
<mat-progress-spinner mode="indeterminate" [diameter]="200" *ngIf="visiblity" [style.margin-top.px] ="spinnerLocation"
class="spinner-wrapper"
[diameter]="100"></mat-progress-spinner>
  </div>`
})

//  mode="indeterminate" class="d-inline-flex" *ngIf="IsWait">
export class LoaderComponent  {
@Input() visiblity = false;
@Input() spinnerLocation = '';
}
