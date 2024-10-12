import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPasswordModalComponent } from './add-password-modal.component';

describe('AddPasswordModalComponent', () => {
  let component: AddPasswordModalComponent;
  let fixture: ComponentFixture<AddPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPasswordModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
