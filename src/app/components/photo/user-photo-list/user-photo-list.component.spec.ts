import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotoListComponent } from './user-photo-list.component';

describe('UserPhotoListComponent', () => {
  let component: UserPhotoListComponent;
  let fixture: ComponentFixture<UserPhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPhotoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
