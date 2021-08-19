import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSalaComponent } from './confirm-sala.component';

describe('ConfirmSalaComponent', () => {
  let component: ConfirmSalaComponent;
  let fixture: ComponentFixture<ConfirmSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
