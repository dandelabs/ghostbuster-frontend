import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MachineFormComponent } from "../machine-form/machine-form.component";
import { MachineService } from "src/app/core/services/machine.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Machine } from "src/app/core/models/models.module";
import { NGXLogger } from "ngx-logger";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { ProductionStatusComponent } from "../../products/production-status/production-status.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FormGroup, FormControl } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-machine-list",
  templateUrl: "./machine-list.component.html",
  styleUrls: ["./machine-list.component.css"],
})
export class MachineListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private logger: NGXLogger,
    private machineService: MachineService,
    private notificationService: NotificationService,
    private titleService: Title,
  ) {}
  private unsubscribe = new Subject<void>();
  displayedColumns: string[] = [
    "id",
    "machine_name",
    "primary_status",
    "secondary_status",
  ];
  form: FormGroup;
  dataSource = new MatTableDataSource<Machine>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    setTimeout(() => {
      this.getMachines();
    }, 0);

    this.form = new FormGroup({
      search: new FormControl(""),
    });

    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe))
      .subscribe((formValue) => {
        if (formValue != "") {
          this.filter(formValue.search);
        }
      });

      this.titleService.setTitle('Machines - Console');
  }

  goToNewMachine(): void {
    const dialogRef = this.dialog.open(MachineFormComponent, {
      data: {},
      width: "350px",
      height: "350px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMachines();
      }
    });
  }

  goToNewProductionStatus(): void {
    const dialogRef = this.dialog.open(ProductionStatusComponent, {
      width: "180",
      height: "120",
      data: {},
    });
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
        this.deleteMachine();
      }
    });
  }

  deleteMachine() {
    this.dataSource.data.forEach((item) => {
      if (item["checked"] == true) {
        this.machineService.delete(item["id"]).subscribe(
          (data: boolean) => {
            this.getMachines();
          },
          (error) => {
            this.notificationService.openSnackBar(JSON.stringify(error.error));
          }
        );
      }
    });
  }

  getMachines() {
    this.machineService.list().subscribe(
      (data: Array<Machine>) => {
        if (data) {
          this.dataSource.data = data;
        }
      },
      (error) => {
        this.logger.log(error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  filter(value: string) {
    const params = {
      name: value
    };

    this.machineService.filter(params).subscribe(
      (data: Array<Machine>) => {
        if (data) {
          this.dataSource = new MatTableDataSource<Machine>(data);
        }
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
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
