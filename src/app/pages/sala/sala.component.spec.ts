import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaComponent } from './sala.component';

describe('SalaComponent', () => {
  let component: SalaComponent;
  let fixture: ComponentFixture<SalaComponent>;

  let btnshow = document.querySelector('button');
  let result = document.querySelector('h1');

  btnshow.addEventListener('click' , () => {
    let checkbox = document.querySelector('input[type="checkbox"]:checked');
    result.innerText = checkbox.parentElement.textContent;
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
