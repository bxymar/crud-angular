import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPresentacion } from './producto-presentacion';

describe('ProductoPresentacion', () => {
  let component: ProductoPresentacion;
  let fixture: ComponentFixture<ProductoPresentacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoPresentacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoPresentacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
