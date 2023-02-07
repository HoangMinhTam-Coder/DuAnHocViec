import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUpdateProductComponent } from './ad-update-product.component';

describe('AdUpdateProductComponent', () => {
  let component: AdUpdateProductComponent;
  let fixture: ComponentFixture<AdUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
