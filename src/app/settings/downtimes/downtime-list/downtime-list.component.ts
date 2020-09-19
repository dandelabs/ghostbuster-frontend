import { Component, OnInit, ViewChild } from "@angular/core";

import { NotificationService } from "../../../core/services/notification.service";
import { NGXLogger } from "ngx-logger";
import { Title } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { Downtime } from "src/app/core/models/models.module";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { debounceTime, takeUntil } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { DowntimeService } from "src/app/core/services/downtime.service";
import { MatDialog } from '@angular/material/dialog';
import { DowntimeFormComponent } from '../downtime-form/downtime-form.component';

@Component({
  selector: "app-downtime-list",
  templateUrl: "./downtime-list.component.html",
  styleUrls: ["./downtime-list.component.css"],
})
export class DowntimeListComponent implements OnInit {
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private downtimeService: DowntimeService,
    public dialog: MatDialog,
  ) {}

  private unsubscribe = new Subject<void>();
  displayedColumns: string[] = [
    "id",
    "item",
    "user",
    "type",
    "detailId",
    "startTime",
    "finishTime",
  ];

  form: FormGroup;
  dataSource = new MatTableDataSource<Downtime>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.titleService.setTitle('Downtimes - Console');

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

    setTimeout(() => {
      this.getDowntimes();
    }, 0);
  }

  getDowntimes() {
    this.downtimeService.list().subscribe(
      (data: Array<Downtime>) => {
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

  goToNewDowntimeType(){
    const dialogRef = this.dialog.open(DowntimeFormComponent, {
      data: {},
      height: "auto",
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDowntimes();
      }
    });
  }

  filter(value: string) {
    const params = {
      name: value,
    };

    this.downtimeService.filter(params).subscribe(
      (data: Array<Downtime>) => {
        if (data) {
          this.dataSource = new MatTableDataSource<Downtime>(data);
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
