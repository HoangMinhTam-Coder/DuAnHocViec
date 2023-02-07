import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAddProductComponent } from './ad-add-product.component';

describe('AdAddProductComponent', () => {
  let component: AdAddProductComponent;
  let fixture: ComponentFixture<AdAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
