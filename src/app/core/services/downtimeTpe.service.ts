import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { NGXLogger } from "ngx-logger";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { DowntimeType } from '../models/models.module';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class DowntimeTypeService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  list(): Observable<Array<DowntimeType>> {
    return this.http.get(environment.apiUrl + "/api/v1/downtimetype").pipe(
      tap(
        (data: Array<DowntimeType>) => {
          return data as Array<DowntimeType>;
        },
        (error) => this.logger.log(error)
      )
    );
  }

  create(formData: FormGroup
  ): Observable<DowntimeType> {

    const params = {
      name: formData.get("name").value,
      description: formData.get("description").value,
      subject: formData.get("type").value,
      statusId: formData.get("status").value,
    };

    return this.http.post(environment.apiUrl + "/api/v1/downtimetype", params).pipe(
      tap(
        (data: DowntimeType) => this.logger.log("Type created"),
        (error) => this.logger.log(error)
      )
    );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/api/v1/downtimetype/" + id).pipe(
      tap(
        (data: boolean) => {
          return data;
        },
        (error) => this.logger.log(error)
      )
    );
  }
}