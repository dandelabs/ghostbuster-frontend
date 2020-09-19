import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { UserManager } from '../models/models.module';

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    @Inject("LOCALSTORAGE") private localStorage: Storage,
    private logger: NGXLogger
  ) {}

  login(username: string, password: string): Observable<UserManager> {
    return this.http.post(environment.apiUrl + "/api/v1/login", {
        username: username,
        password: password
    }).pipe(
      tap(
        (data: UserManager) => this.logger.log('Logged'),
        (error) => this.logger.log(error)
      )
    );
  }

  logout(): void {
    this.localStorage.removeItem("currentUser");
  }

  setCurrentUser(user:UserManager): void{
    this.localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(this.localStorage.getItem('currentUser'));
  }

  passwordResetRequest(email: string) {
    return of(true).delay(1000);
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).delay(1000);
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    return of(true).delay(1000);
  }
}
