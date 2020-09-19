import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionStatusComponent } from './production-status.component';

describe('ProductionStatusComponent', () => {
  let component: ProductionStatusComponent;
  let fixture: ComponentFixture<ProductionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
