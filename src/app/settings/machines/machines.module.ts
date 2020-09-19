import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from "@angular/material/radio";
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineFormComponent } from './machine-form/machine-form.component';
import { ProductionStatusComponent } from '../products/production-status/production-status.component';



@NgModule({
  declarations: [MachineListComponent, MachineFormComponent, ProductionStatusComponent],
  imports: [
    CommonModule,
    MatRadioModule
  ]
})
export class MachinesModule { }
