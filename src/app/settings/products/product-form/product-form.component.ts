import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  ProductionStatus,
  Machine,
  Item,
  ProductsProcess,
} from "src/app/core/models/models.module";
import { ProductionStatusService } from "src/app/core/services/productionStatus.service";
import { MachineService } from "src/app/core/services/machine.service";
import { ItemService } from "src/app/core/services/item.service";
import { NGXLogger } from "ngx-logger";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { ProductService } from "src/app/core/services/products.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  states: ProductionStatus[];
  machines: Machine[];
  items: Item[];

  constructor(
    private productionStatusService: ProductionStatusService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    private machineService: MachineService,
    private itemService: ItemService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      item: new FormControl("", Validators.required),
      machine: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      fromStatus: new FormControl("", Validators.required),
      toStatus: new FormControl("", Validators.required),
    });

    setTimeout(() => {
      this.getProductionStatus();
      this.getItems();
      this.getMachines();
    }, 0);
  }

  onDismiss(result: boolean): void {
    this.dialogRef.close(result);
  }

  createProduct(formData: FormGroup) {
    return this.productService
      .create(
        this.form.get("time").value,
        this.form.get("status").value,
        this.form.get("machine").value,
        this.form.get("fromStatus").value,
        this.form.get("toStatus").value,
        this.form.get("item").value
      )
      .subscribe(
        (data: ProductsProcess) => {
          if (data) {
            this.onDismiss(true);
          }
        },
        (error) => {
          this.logger.log(error.error);
          this.notificationService.openSnackBar(JSON.stringify(error.error));
        }
      );
  }

  getProductionStatus() {
    const params = {
      statusId: 1,
    };

    this.productionStatusService.filter(params).subscribe(
      (data: Array<ProductionStatus>) => {
        if (data) {
          this.states = data;
        }
      },
      (error) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  getMachines() {
    const params = {
      statusId: 1,
    };

    this.machineService.filter(params).subscribe(
      (data: Array<Machine>) => {
        if (data) {
          this.machines = data;
        }
      },
      (error) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  getItems() {
    const params = {
      statusId: 1,
    };

    this.itemService.filter(params).subscribe(
      (data: Array<Item>) => {
        if (data) {
          this.items = data;
        }
      },
      (error) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }
}
