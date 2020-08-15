import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { SharedModule } from "../shared/shared.module";
import { RolesComponent } from "./roles/roles.component";

@NgModule({
  declarations: [UserListComponent, RolesComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
})
export class UsersModule {}
