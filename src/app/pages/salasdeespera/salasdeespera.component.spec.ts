import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasdeesperaComponent } from './salasdeespera.component';

describe('SalasdeesperaComponent', () => {
  let component: SalasdeesperaComponent;
  let fixture: ComponentFixture<SalasdeesperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasdeesperaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasdeesperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
