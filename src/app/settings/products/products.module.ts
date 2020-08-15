import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
