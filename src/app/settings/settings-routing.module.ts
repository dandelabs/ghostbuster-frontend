import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineListComponent } from './machines/machine-list/machine-list.component';
import { MachineFormComponent } from './machines/machine-form/machine-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { WorkingHoursListComponent } from './working-hours/working-hours-list/working-hours-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { DowntimeListComponent } from './downtimes/downtime-list/downtime-list.component';
import { DowntimeFormComponent } from './downtimes/downtime-form/downtime-form.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { MatrixFormComponent } from './matrix/matrix-form/matrix-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'machines', component: MachineListComponent },
      { path: 'machines/form', component: MachineFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/form', component: ProductFormComponent },
      { path: 'downtimes', component: DowntimeListComponent },
      { path: 'downtimes/form', component: DowntimeFormComponent },
      { path: 'workinghours', component: WorkingHoursListComponent },
      { path: 'matrix', component: MatrixFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
