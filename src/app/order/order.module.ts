import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderFormComponent } from "./order-form/order-form.component";
import { OrderRoutingModule } from "./order-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    OrderListComponent, 
    OrderFormComponent
  ],
  imports: [
    CommonModule, 
    OrderRoutingModule, 
    SharedModule
  ],
  entryComponents: [
  ]
})
export class OrderModule {}
