import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { UserManager } from "../models/models.module";
import { FormControl, FormGroup } from "@angular/forms";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  create(formData: FormControl): Observable<UserManager> {
    return this.http
      .post(environment.apiUrl + "/api/v1/user/create", {
        firstName: formData.get("firstName").value,
        lastName: formData.get("lastName").value,
        nick_name: formData.get("nickName").value,
        password: formData.get("password").value,
        date_of_birth: formData.get("dateofbirth").value.format("DD-MM-YYYY"),
        createdDate: Date.now(),
        salt: "Pending",
        statusId: 1,
      })
      .pipe(
        tap(
          (data: UserManager) => this.logger.log("User created"),
          (error) => this.logger.log(error)
        )
      );
  }

  save(formData: FormGroup, id: number): Observable<UserManager> {
    let params = {
      firstName: formData["firstName"],
      lastName: formData["lastName"],
      date_of_birth: moment(formData["dateofbirth"]).format("DD-MM-YYYY"),
      updatedDate: Date.now(),
    };

    if (formData["password"] !== "") {
      params["password"] = formData["password"];
    }

    return this.http
      .put(environment.apiUrl + "/api/v1/user/" + id, params)
      .pipe(
        tap(
          (data: UserManager) => this.logger.log("User updated"),
          (error) => this.logger.log(error)
        )
      );
  }

  get(id: number) {
    return this.http.get(environment.apiUrl + "/api/v1/user/" + id).pipe(
      tap(
        (data: UserManager) => {
          return data as UserManager;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/api/v1/user/" + id).pipe(
      tap(
        (data: boolean) => {
          return data;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<UserManager>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/user/filter", params)
      .pipe(
        tap(
          (data: Array<UserManager>) => {
            return data as Array<UserManager>;
          },
          (error) => this.logger.log(error)
        )
      );
  }

  list(): Observable<Array<UserManager>> {
    return this.http.get(environment.apiUrl + "/api/v1/user").pipe(
      tap(
        (data: Array<UserManager>) => {
          return data as Array<UserManager>;
        },
        (error) => this.logger.log(error)
      )
    );
  }
}
