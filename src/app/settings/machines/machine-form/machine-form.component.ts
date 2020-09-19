import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductionStatus, Machine } from "src/app/core/models/models.module";
import { ProductionStatusService } from "src/app/core/services/productionStatus.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MachineService } from "src/app/core/services/machine.service";
import { NGXLogger } from "ngx-logger";
import { Router } from "@angular/router";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"],
})
export class MachineFormComponent implements OnInit {
  form: FormGroup;
  selectedPrimaryStatus: number;
  selectedSecondaryStatus: number;
  states: ProductionStatus[];

  constructor(
    private productionStatusService: ProductionStatusService,
    private machineService: MachineService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      primaryStatus: new FormControl("", Validators.required),
      SecondaryStatus: new FormControl("", Validators.required),
    });

    setTimeout(() => this.getProductionStatus(), 0);
  }

  onDismiss(result: boolean): void {
    this.dialogRef.close(result);
  }

  createMachine(formData: FormGroup) {
    return this.machineService
      .create(
        this.form.get("name").value,
        1,
        this.selectedPrimaryStatus,
        this.selectedSecondaryStatus
      )
      .subscribe(
        (data: Machine) => {
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
}
