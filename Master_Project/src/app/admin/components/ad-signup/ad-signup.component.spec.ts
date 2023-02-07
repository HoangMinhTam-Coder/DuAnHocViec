import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSignupComponent } from './ad-signup.component';

describe('AdSignupComponent', () => {
  let component: AdSignupComponent;
  let fixture: ComponentFixture<AdSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
