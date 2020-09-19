import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { Machine, ProductsProcess } from "../models/models.module";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  create(
    stdTime: number,
    statusId: number,
    machineId: number,
    fromStatusId: number,
    toStatusId: number,
    itemId: number
  ): Observable<ProductsProcess> {
    const params = {
      stdTime: stdTime,
      statusId: statusId,
      machineId: machineId,
      fromStatusId: fromStatusId,
      toStatusId: toStatusId,
      itemId: itemId,
    };

    return this.http.post(environment.apiUrl + "/api/v1/product", params).pipe(
      tap(
        (data: ProductsProcess) => this.logger.log("Product created"),
        (error) => this.logger.log(error)
      )
    );
  }

  save(
    id: number,
    stdTime: number,
    statusId: number,
    machineId: number,
    fromStatusId: number,
    toStatusId: number,
    itemId: number
  ): Observable<ProductsProcess> {
    const params = {
      stdTime: stdTime,
      statusId: statusId,
      machineId: machineId,
      fromStatusId: fromStatusId,
      toStatusId: toStatusId,
      itemId: itemId,
    };

    return this.http
      .put(environment.apiUrl + "/api/v1/product/" + id, params)
      .pipe(
        tap(
          (data: ProductsProcess) => this.logger.log("Product updated"),
          (error) => this.logger.log(error)
        )
      );
  }

  get(id: number) {
    return this.http.get(environment.apiUrl + "/api/v1/product/" + id).pipe(
      tap(
        (data: ProductsProcess) => {
          return data as ProductsProcess;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/api/v1/product/" + id).pipe(
      tap(
        (data: boolean) => {
          return data;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  list(): Observable<Array<ProductsProcess>> {
    return this.http.get(environment.apiUrl + "/api/v1/product").pipe(
      tap(
        (data: Array<ProductsProcess>) => {
          return data as Array<ProductsProcess>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<ProductsProcess>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/product/filter", params)
      .pipe(
        tap(
          (data: Array<ProductsProcess>) => {
            return data as Array<ProductsProcess>;
          },
          (error) => this.logger.log(error)
        )
      );
  }
}
