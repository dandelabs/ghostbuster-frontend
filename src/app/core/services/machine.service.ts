import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { Machine } from "../models/models.module";

@Injectable({
  providedIn: "root",
})
export class MachineService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  create(
    name: string,
    statusId: number,
    primaryStatusId: number,
    secondaryStatusId: number
  ): Observable<Machine> {
    const params = {
      name: name,
      statusId: statusId,
      primaryStatusId: primaryStatusId,
      secondaryStatusId: secondaryStatusId,
    };

    return this.http.post(environment.apiUrl + "/api/v1/machine", params).pipe(
      tap(
        (data: Machine) => this.logger.log("Machine created"),
        (error) => this.logger.log(error)
      )
    );
  }

  save(
    id: number,
    statusId: number,
    statusIdPrimary: number,
    statusIdSecondary: number
  ): Observable<Machine> {
    let params = {
      statusId: statusId,
      statusIdPrimary: statusIdPrimary,
      statusIdSecondary: statusIdSecondary,
    };

    return this.http
      .put(environment.apiUrl + "/api/v1/machine/" + id, params)
      .pipe(
        tap(
          (data: Machine) => this.logger.log("Machine updated"),
          (error) => this.logger.log(error)
        )
      );
  }

  get(id: number) {
    return this.http.get(environment.apiUrl + "/api/v1/machine/" + id).pipe(
      tap(
        (data: Machine) => {
          return data as Machine;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/api/v1/machine/" + id).pipe(
      tap(
        (data: boolean) => {
          return data;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  list(): Observable<Array<Machine>> {
    return this.http.get(environment.apiUrl + "/api/v1/machine").pipe(
      tap(
        (data: Array<Machine>) => {
          return data as Array<Machine>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<Machine>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/machine/filter", params)
      .pipe(
        tap(
          (data: Array<Machine>) => {
            return data as Array<Machine>;
          },
          (error) => this.logger.log(error)
        )
      );
  }
}
