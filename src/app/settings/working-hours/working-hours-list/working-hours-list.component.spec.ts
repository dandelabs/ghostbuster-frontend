import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursListComponent } from './working-hours-list.component';

describe('WorkingHoursListComponent', () => {
  let component: WorkingHoursListComponent;
  let fixture: ComponentFixture<WorkingHoursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHoursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
