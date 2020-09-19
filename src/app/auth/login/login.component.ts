import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { EMPTY, of } from "rxjs";
import "rxjs/add/operator/delay";

import { AuthenticationService } from "../../core/services/auth.service";
import { NotificationService } from "../../core/services/notification.service";
import { UserManager } from "src/app/core/models/models.module";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Login");
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUsername = localStorage.getItem("savedUsername");

    this.loginForm = new FormGroup({
      username: new FormControl(savedUsername, [Validators.required]),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl(savedUsername !== null),
    });
  }

  login() {
    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;
    const rememberMe = this.loginForm.get("rememberMe").value;

    this.loading = true;
    this.authenticationService
      .login(username.toLowerCase(), password)
      .subscribe(
        (data) => {
          if (rememberMe) {
            localStorage.setItem("savedUsername", username);
          } else {
            localStorage.removeItem("savedUsername");
          }

          if (data) {
            const user: UserManager = data["result"] as UserManager;
            this.authenticationService.setCurrentUser(user);
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.notificationService.openSnackBar(error.error);
          this.loading = false;
        }
      );
  }

  resetPassword() {
    this.router.navigate(["/auth/password-reset-request"]);
  }
}
