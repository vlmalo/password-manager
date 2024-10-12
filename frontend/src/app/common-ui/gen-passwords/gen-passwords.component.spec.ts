import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenPasswordsComponent } from './gen-passwords.component';

describe('GenPasswordsComponent', () => {
  let component: GenPasswordsComponent;
  let fixture: ComponentFixture<GenPasswordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenPasswordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
