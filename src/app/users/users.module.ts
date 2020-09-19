import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";

import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { SharedModule } from "../shared/shared.module";
import { RolesComponent } from "./roles/roles.component";
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [UserListComponent, RolesComponent, UserFormComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule, MatGridListModule],
})
export class UsersModule {}
