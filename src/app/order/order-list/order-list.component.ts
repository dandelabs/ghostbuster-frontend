import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { PeriodicElement } from 'src/app/core/models/models.module';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  private unsubscribe = new Subject<void>();
  form: FormGroup;
  displayedColumns: string[] = ['id', 'customerName', 'createdDate', 'dueDate', 'status', 'priorityStatus', ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(false, null);


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.titleService.setTitle('Orders - Console');

    this.form = new FormGroup({
      search: new FormControl(""),
    });

    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe))
      .subscribe((formValue) => {
        if (formValue != "") {
          //this.filter(formValue.search);
        }
      });
  }

}
