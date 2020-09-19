import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { Machine, ProductsProcess, Item } from "../models/models.module";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  create(
    code: string,
    description: string,
    status: number
  ): Observable<Item> {

    const params = {
      code: code,
      description: description,
      statusId: status,
    };

    return this.http.post(environment.apiUrl + "/api/v1/item", params).pipe(
      tap(
        (data: Item) => this.logger.log("Item created"),
        (error) => this.logger.log(error)
      )
    );
  }

  save(
    id: number,
    code: string,
    description: string,
  ): Observable<Item> {
    const params = {
        code: code,
        description: description
    };

    return this.http
      .put(environment.apiUrl + "/api/v1/item/" + id, params)
      .pipe(
        tap(
          (data: Item) => this.logger.log("Item updated"),
          (error) => this.logger.log(error)
        )
      );
  }

  get(id: number) {
    return this.http.get(environment.apiUrl + "/api/v1/item/" + id).pipe(
      tap(
        (data: Item) => {
          return data as Item;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/api/v1/item/" + id).pipe(
      tap(
        (data: boolean) => {
          return data;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  list(): Observable<Array<Item>> {
    return this.http.get(environment.apiUrl + "/api/v1/item").pipe(
      tap(
        (data: Array<Item>) => {
          return data as Array<Item>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<Item>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/item/filter", params)
      .pipe(
        tap(
          (data: Array<Item>) => {
            return data as Array<Item>;
          },
          (error) => this.logger.log(error)
        )
      );
  }
}
