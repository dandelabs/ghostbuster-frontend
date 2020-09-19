import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form/item-form.component';
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [ItemFormComponent],
  imports: [
    CommonModule,
    MatRadioModule
  ]
})
export class ItemModule { }
