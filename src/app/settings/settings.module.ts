import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from "../shared/shared.module";
import { MatRadioModule } from "@angular/material/radio";
import { SettingsRoutingModule } from "./settings-routing.module";
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MachineListComponent } from "./machines/machine-list/machine-list.component";
import { MachineFormComponent } from "./machines/machine-form/machine-form.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductFormComponent } from "./products/product-form/product-form.component";
import { DowntimeListComponent } from "./downtimes/downtime-list/downtime-list.component";
import { DowntimeFormComponent } from "./downtimes/downtime-form/downtime-form.component";
import { WorkingHoursListComponent } from "./working-hours/working-hours-list/working-hours-list.component";
import { MatrixFormComponent } from "./matrix/matrix-form/matrix-form.component";
import { ProductionStatusComponent } from './products/production-status/production-status.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

@NgModule({
  declarations: [
    MachineListComponent,
    MachineFormComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductionStatusComponent,
    DowntimeListComponent,
    DowntimeFormComponent,
    WorkingHoursListComponent,
    MatrixFormComponent,
    ItemFormComponent
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, MatRadioModule, ScrollingModule, TableVirtualScrollModule],
})
export class SettingsModule {}
