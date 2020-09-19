import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { NotificationService } from "../../core/services/notification.service";
import { NGXLogger } from "ngx-logger";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { UserManager } from "src/app/core/models/models.module";
import { MatPaginator } from "@angular/material/paginator";
import { UserService } from "src/app/core/services/user.service";
import { MatSort } from "@angular/material/sort";
import * as moment from "moment";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FormGroup, FormControl } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  private unsubscribe = new Subject<void>();
  moment: any = moment;
  form: FormGroup;
  displayedColumns: string[] = [
    "id",
    "firstName",
    "nick_name",
    "salt",
    "statusId",
    "createdDate",
  ];
  dataSource = new MatTableDataSource<UserManager>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.logger.log("Users loaded");
    setTimeout(() => this.getUsers(), 0);

    this.form = new FormGroup({
      search: new FormControl(""),
    });

    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe))
      .subscribe((formValue) => {
        if (formValue != "") {
          this.filterUsers(formValue.search);
        }
      });

      this.titleService.setTitle('Users - Console');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  openDialog(): void {
    const data = new ConfirmDialogModel("Confirm", "are you sure?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "180",
      height: "120",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser();
      }
    });
  }

  getUsers() {
    this.userService.list().subscribe(
      (data: Array<UserManager>) => {
        if (data) {
          this.dataSource.data = data;
        }
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  deleteUser() {
    this.dataSource.data.forEach((item) => {
      if (item["checked"] == true) {
        this.userService.delete(item["id"]).subscribe(
          (data: boolean) => {
            this.getUsers();
          },
          (error) => {
            this.notificationService.openSnackBar(JSON.stringify(error.error));
          }
        );
      }
    });
  }

  filterUsers(value: string) {
    const params = {
      firstName: value,
      lastName: value,
      nick_name: value,
    };

    this.userService.filter(params).subscribe(
      (data: Array<UserManager>) => {
        if (data) {
          this.dataSource = new MatTableDataSource<UserManager>(data);
        }
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  goToNewUser() {
    this.router.navigate(["/users/form/0"]);
  }

  isAllSelected() {
    let numSelected = 0;

    this.dataSource.data.forEach((item) => {
      if (item["checked"] == true) {
        numSelected++;
      }
    });

    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterSelect(event: MatCheckboxChange) {
    this.dataSource.data.forEach((item) => {
      item["checked"] = event.checked;
    });
  }
}
