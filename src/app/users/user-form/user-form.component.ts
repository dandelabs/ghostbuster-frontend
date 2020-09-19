import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs/operators";
import { ErrorStateMatcher } from "@angular/material/core";
import { Subject } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { UserManager } from "src/app/core/models/models.module";
import { NotificationService } from "src/app/core/services/notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  form: FormGroup;
  passwordMatch: boolean = false;
  hidePassword: boolean = true;
  matcher = new PasswordErrorStateMatcher();
  private unsubscribe = new Subject<void>();
  minDate: Date;
  maxDate: Date;
  id: number;

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date();

    this.form = new FormGroup(
      {
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        nickName: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        reEnterPassword: new FormControl(""),
        dateofbirth: new FormControl("", Validators.required),
      },
      { validators: this.checkPasswords }
    );

    this.route.paramMap.subscribe((params) => {
      this.id = params["params"].id;

      if (this.id > 0) {
        setTimeout(() => this.getUser(this.id), 0);
      }
    });

    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe))
      .subscribe((formValue) => {
        if (this.id > 0 && this.form.dirty && this.form.status == 'VALID') {
          this.saveUser(formValue);
        }
      });
  }

  getUser(id: number) {
    return this.userService.get(id).subscribe(
      (data: UserManager) => {
        if (data) {
          let user = data["result"] as UserManager;

          this.form.setValue({
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nick_name,
            password: user.password || '',
            reEnterPassword: user.password || '',
            dateofbirth: moment(user['date_of_birth'], "DD-MM-YYYY") || null,
          });
        }
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error.error));
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  saveUser(formData: FormGroup) {
    return this.userService.save(formData, this.id).subscribe(
      (data) => {
        this.notificationService.openSnackBar("Saved");
        return data as UserManager;
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  createUser(formData: FormControl) {
    return this.userService.create(formData).subscribe(
      (data) => {
        if (data) {
          this.id = data.id;
        }

        this.notificationService.openSnackBar("User created successfully");
        this.router.navigate(["/users/list/"]);
        return data as UserManager;
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }
  
  deleteUser(){
    this.userService.delete(this.id).subscribe(
      (data: boolean) => {
          this.router.navigate(["users/list"]);
      },
      (error) => {
        this.notificationService.openSnackBar(JSON.stringify(error.error));
      }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get("password").value;
    let confirmPass = group.get("reEnterPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }
}

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
