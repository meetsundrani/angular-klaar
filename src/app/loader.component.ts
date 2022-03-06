import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-loader',
  template: `<div class="overlay"><div class="center">  <mat-progress-spinner mode="indeterminate" *ngIf="visiblity" class="overlay spinner-wrapper"> </mat-progress-spinner></div></div>`
})


//  mode="indeterminate" class="d-inline-flex" *ngIf="IsWait">
export class LoaderComponent  {
@Input() visiblity = false;
@Input() spinnerLocation = '';
}
