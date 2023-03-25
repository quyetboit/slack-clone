import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoworkersComponent } from './add-coworkers.component';

describe('AddCoworkersComponent', () => {
  let component: AddCoworkersComponent;
  let fixture: ComponentFixture<AddCoworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddCoworkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
