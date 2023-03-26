import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCustomComponent } from './avatar-custom.component';

describe('AvatarCustomComponent', () => {
  let component: AvatarCustomComponent;
  let fixture: ComponentFixture<AvatarCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AvatarCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
