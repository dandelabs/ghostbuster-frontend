import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserListComponent } from "./user-list/user-list.component";
import { LayoutComponent } from "../shared/layout/layout.component";
import { RolesComponent } from "./roles/roles.component";
import { UserFormComponent } from "./user-form/user-form.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "list", component: UserListComponent },
      { path: "settings/:page", component: RolesComponent },
      { path: "form/:id", component: UserFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
