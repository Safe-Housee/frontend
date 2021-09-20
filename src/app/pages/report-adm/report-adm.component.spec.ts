import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdmComponent } from './report-adm.component';

describe('ReportAdmComponent', () => {
  let component: ReportAdmComponent;
  let fixture: ComponentFixture<ReportAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
