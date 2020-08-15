import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowntimeListComponent } from './downtime-list.component';

describe('DowntimeListComponent', () => {
  let component: DowntimeListComponent;
  let fixture: ComponentFixture<DowntimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowntimeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
