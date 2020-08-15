import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DowntimeListComponent } from './downtime-list/downtime-list.component';
import { DowntimeFormComponent } from './downtime-form/downtime-form.component';

@NgModule({
  declarations: [DowntimeListComponent, DowntimeFormComponent],
  imports: []
})
export class DowntimesModule { }
