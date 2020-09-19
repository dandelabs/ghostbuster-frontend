import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { Downtime } from '../models/models.module';

@Injectable({
  providedIn: "root",
})
export class DowntimeService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  list(): Observable<Array<Downtime>> {
    return this.http.get(environment.apiUrl + "/api/v1/downtime").pipe(
      tap(
        (data: Array<Downtime>) => {
          return data as Array<Downtime>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  filter(params: any): Observable<Array<Downtime>> {
    return this.http
      .post(environment.apiUrl + "/api/v1/downtime/filter", params)
      .pipe(
        tap(
          (data: Array<Downtime>) => {
            return data as Array<Downtime>;
          },
          (error) => this.logger.log(error)
        )
      );
  }
}
