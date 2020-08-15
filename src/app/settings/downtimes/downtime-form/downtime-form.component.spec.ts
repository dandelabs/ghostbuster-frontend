import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowntimeFormComponent } from './downtime-form.component';

describe('DowntimeFormComponent', () => {
  let component: DowntimeFormComponent;
  let fixture: ComponentFixture<DowntimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowntimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
