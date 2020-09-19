import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatRadioModule } from "@angular/material/radio";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductionStatusComponent } from "./production-status/production-status.component";

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    ProductionStatusComponent,
  ],
  imports: [CommonModule, MatRadioModule],
})
export class ProductsModule {}
