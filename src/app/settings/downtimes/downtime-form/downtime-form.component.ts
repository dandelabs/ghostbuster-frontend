import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { DowntimeType } from "src/app/core/models/models.module";
import { DowntimeService } from "src/app/core/services/downtime.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { NGXLogger } from "ngx-logger";
import { DowntimeTypeService } from "src/app/core/services/downtimeTpe.service";

@Component({
  selector: "app-downtime-form",
  templateUrl: "./downtime-form.component.html",
  styleUrls: ["./downtime-form.component.css"],
})
export class DowntimeFormComponent implements OnInit {
  form: FormGroup;
  downtimes: DowntimeType[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private downtimeService: DowntimeTypeService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    setTimeout(() => {
      this.list();
    }, 0);
  }

  onDismiss(result: boolean): void {
    this.dialogRef.close(result);
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

  create(formData: FormGroup) {
    return this.downtimeService.create(formData).subscribe(
      (data: DowntimeType) => {
        if (data) {
          this.form.reset();
          this.list();
        }
      },
      (error: { error: any }) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  delete(id: number) {
    this.downtimeService.delete(id).subscribe(
      (data) => {
        this.list();
      },
      (error) => {
        this.logger.log(error.error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  list() {
    this.downtimeService.list().subscribe(
      (data: Array<DowntimeType>) => {
        if (data) {
          this.downtimes = data;
        }
      },
      (error) => {
        this.logger.log(error);
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }
}
