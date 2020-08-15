import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineFormComponent } from './machine-form/machine-form.component';



@NgModule({
  declarations: [MachineListComponent, MachineFormComponent],
  imports: [
    CommonModule
  ]
})
export class MachinesModule { }
