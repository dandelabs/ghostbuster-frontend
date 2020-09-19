import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { NGXLogger } from "ngx-logger";
import { NotificationService } from "src/app/core/services/notification.service";
import { FormGroup, FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ProductsProcess } from "src/app/core/models/models.module";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { takeUntil, debounceTime } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ProductService } from "src/app/core/services/products.service";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ItemFormComponent } from "../../item/item-form/item-form.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private productProcessService: ProductService,
    private titleService: Title,
  ) {}

  private unsubscribe = new Subject<void>();
  displayedColumns: string[] = [
    "id",
    "itemName",
    "machineName",
    "fromStatusId",
    "toStatusId",
    "stdTime",
  ];
  form: FormGroup;
  dataSource = new MatTableDataSource<ProductsProcess>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getProducts();
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

      this.titleService.setTitle('Products - Console');
  }

  goToNewProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: {},
      height: "480px",
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }

  goToNewItem(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
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
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this.dataSource.data.forEach((item) => {
      if (item["checked"] == true) {
        this.productProcessService.delete(item["id"]).subscribe(
          (data: boolean) => {
            this.getProducts();
          },
          (error) => {
            this.notificationService.openSnackBar(JSON.stringify(error.error));
          }
        );
      }
    });
  }

  getProducts() {
    this.productProcessService.list().subscribe(
      (data: Array<ProductsProcess>) => {
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
      name: value,
    };

    this.productProcessService.filter(params).subscribe(
      (data: Array<ProductsProcess>) => {
        if (data) {
          this.dataSource = new MatTableDataSource<ProductsProcess>(data);
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
