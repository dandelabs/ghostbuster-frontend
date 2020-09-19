import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import {
  Machine,
  ProductionStatus,
} from "../models/models.module";

@Injectable({
  providedIn: "root",
})
export class ProductionStatusService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  create(description: string, statusId: number): Observable<ProductionStatus> {
    return this.http
      .post(environment.apiUrl + "/api/v1/productionstatus", {
        description: description,
        statusId: statusId,
      })
      .pipe(
        tap(
          (data: ProductionStatus) =>
            this.logger.log("Productionstatus created"),
          (error) => this.logger.log(error)
        )
      );
  }

  save(id: number, statusId: number): Observable<ProductionStatus> {
    let params = {
      statusId: statusId,
    };

    return this.http
      .put(environment.apiUrl + "/api/v1/machine/" + id, params)
      .pipe(
        tap(
          (data: ProductionStatus) =>
            this.logger.log("Productionstatus updated"),
          (error) => this.logger.log(error)
        )
      );
  }

  delete(id: number) {
    return this.http
      .delete(environment.apiUrl + "/api/v1/productionstatus/" + id)
      .pipe(
        tap(
          (data: boolean) => {
            return data;
          },
          (error) => this.logger.log(error)
        )
      );
  }

  list(): Observable<Array<ProductionStatus>> {
    return this.http.get(environment.apiUrl + "/api/v1/productionstatus").pipe(
      tap(
        (data: Array<ProductionStatus>) => {
          return data as Array<ProductionStatus>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<ProductionStatus>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/productionstatus/filter", { params })
      .pipe(
        tap(
          (data: Array<ProductionStatus>) => {
            return data as Array<ProductionStatus>;
          },
          (error) => this.logger.log(error)
        )
      );
  }
}
