import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ItemService } from "src/app/core/services/item.service";
import { Item } from "src/app/core/models/models.module";
import { NotificationService } from "src/app/core/services/notification.service";
import { NGXLogger } from "ngx-logger";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatSort } from "@angular/material/sort";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: "app-item-form",
  templateUrl: "./item-form.component.html",
  styleUrls: ["./item-form.component.css"],
})
export class ItemFormComponent implements OnInit {
  form: FormGroup;
  formSearch: FormGroup;

  private unsubscribe = new Subject<void>();
  displayedColumns: string[] = ["id", "code", "description", "status"];
  datasourceItem = new TableVirtualScrollDataSource<Item>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.datasourceItem.sort = this.sort;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    this.formSearch = new FormGroup({
      search: new FormControl(""),
    });

    this.formSearch.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe))
      .subscribe((formValue) => {
        if (formValue != "") {
          this.filter(formValue.search);
        }
      });

    setTimeout(() => {
      this.getItems();
    }, 0);
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
        this.deleteItem();
      }
    });
  }

  createItem(formData: FormGroup) {
    return this.itemService
      .create(
        this.form.get("code").value,
        this.form.get("description").value,
        this.form.get("status").value
      )
      .subscribe(
        (data: Item) => {
          if (data) {
            this.getItems();
          }
        },
        (error) => {
          this.logger.log(error.error);
          this.notificationService.openSnackBar(JSON.stringify(error.error));
        }
      );
  }

  deleteItem() {
    this.datasourceItem.data.forEach((item) => {
      if (item["checked"] == true) {
        this.itemService.delete(item["id"]).subscribe(
          (data: boolean) => {
            this.getItems();
          },
          (error) => {
            this.notificationService.openSnackBar(JSON.stringify(error.error));
          }
        );
      }
    });
  }

  getItems() {
    this.itemService.list().subscribe(
      (data: Array<Item>) => {
        if (data) {
          this.datasourceItem = new TableVirtualScrollDataSource<Item>(data);
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
      code: value,
      description: value,
    };

    this.itemService.filter(params).subscribe(
      (data: Array<Item>) => {
        if (data) {
          this.datasourceItem = new TableVirtualScrollDataSource<Item>(data);
        }
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  isAllSelected() {
    let numSelected = 0;

    try {
      this.datasourceItem.data.forEach((item) => {
        if (item["checked"] == true) {
          numSelected++;
        }
      });

      const numRows = this.datasourceItem.data.length;
      return numSelected == numRows;
    } catch (error) {
      this.logger.log(error);
    }
  }

  masterSelect(event: MatCheckboxChange) {
    this.datasourceItem.data.forEach((item) => {
      item["checked"] = event.checked;
    });
  }
}
