import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductionStatusService } from "src/app/core/services/productionStatus.service";
import { ProductionStatus } from "src/app/core/models/models.module";
import { NGXLogger } from "ngx-logger";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-production-status",
  templateUrl: "./production-status.component.html",
  styleUrls: ["./production-status.component.css"],
})
export class ProductionStatusComponent implements OnInit {
  form: FormGroup;
  states: ProductionStatus[] = [];

  constructor(
    private productionStatusService: ProductionStatusService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    setTimeout(() => {
      this.getProductionStatus();
    }, 0);
  }

  openDialog(id: number): void {
    const data = new ConfirmDialogModel("Confirm", "are you sure?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "180",
      height: "120",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(id);
      }
    });
  }

  onDismiss(result: boolean): void {
    this.dialogRef.close(result);
  }

  createProductionStatus(formData: FormGroup) {
    return this.productionStatusService
      .create(this.form.get("name").value, this.form.get("status").value)
      .subscribe(
        (data: ProductionStatus) => {
          if (data) {
            this.form.reset();
            this.getProductionStatus();
            //this.onDismiss(true);
          }
        },
        (error) => {
          this.logger.log(error.error);
          this.notificationService.openSnackBar(JSON.stringify(error.error));
        }
      );
  }

  getProductionStatus() {
    this.productionStatusService.list().subscribe(
      (data: ProductionStatus[]) => {
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

  delete(id: number) {
    this.productionStatusService.delete(id).subscribe(
      (data) => {
        this.getProductionStatus();
      },
      (error) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }
}
