import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoGuardar } from './producto-guardar';

describe('ProductoGuardar', () => {
  let component: ProductoGuardar;
  let fixture: ComponentFixture<ProductoGuardar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoGuardar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoGuardar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
