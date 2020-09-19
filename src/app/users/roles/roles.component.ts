import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  constructor(
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Roles - Console');
  }

  roles = [
    { text: "Role", cols: 1, rows: 1, class: "title-accent", istitle: true },
    {
      text: "Orders module",
      cols: 2,
      rows: 1,
      class: "title-accent",
      istitle: true,
    },
    {
      text: "Settings module",
      cols: 2,
      rows: 1,
      class: "title-accent",
      istitle: true,
    },

    { text: "Admin", cols: 1, rows: 1, class: "cell", istitle: true },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },

    { text: "Operator", cols: 1, rows: 1, class: "cell", istitle: true },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },

    { text: "Service", cols: 1, rows: 1, class: "cell", istitle: true },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Read", cols: 1, rows: 1, class: "cell", istitle: false },
    { text: "Write", cols: 1, rows: 1, class: "cell", istitle: false },
  ];

  save(): void {
    console.log('Saving...');
  }
  
}
