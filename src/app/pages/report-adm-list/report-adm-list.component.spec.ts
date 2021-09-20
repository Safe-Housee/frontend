import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdmListComponent } from './report-adm-list.component';

describe('ReportAdmListComponent', () => {
  let component: ReportAdmListComponent;
  let fixture: ComponentFixture<ReportAdmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAdmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
