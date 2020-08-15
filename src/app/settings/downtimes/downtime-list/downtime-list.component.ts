import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../core/services/notification.service'
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-downtime-list',
  templateUrl: './downtime-list.component.html',
  styleUrls: ['./downtime-list.component.css']
})
export class DowntimeListComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title

  ) { }

  ngOnInit(): void {
  }

}
