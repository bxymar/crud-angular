import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductoResponseDTO } from '../../core/interfaces/productoResponseDTO.interface';
import { Producto } from '../../core/services/producto/producto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoRequestDTO } from '../../core/interfaces/productoRequestoDTO.interface';

@Component({
  selector: 'app-producto-guardar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './producto-guardar.html',
  styleUrl: './producto-guardar.css',
})
export class ProductoGuardar implements OnInit{

  private productoServicio = inject(Producto);
  private construirFormulario = inject(FormBuilder);
  
  public formularioProducto!: FormGroup;

  @Input() isOpen = false;
  @Input() titulo = 'Registrar Producto';

  @Output() productoCreado = new EventEmitter<ProductoResponseDTO>();
  @Output() closed = new EventEmitter<void>();

  // Metodo para cerrar el modal
  public closeModal(){
    this.isOpen = false;
    this.closed.emit();
  }

  ngOnInit(): void {
    this.formularioProducto = this.construirFormulario.group({
      nombreProducto: ['', Validators.required, Validators.min(3), Validators.max(50)],
      precioCompra: [0, Validators.required],
      precioVenta: [0, Validators.required],
      proveedor: ['', Validators.required],
      stock: [0, Validators.required],
      idCategoria: [0, Validators.required]
    })
  }

  public guardarProducto(){
    if (this.formularioProducto.invalid){
      return;
    }

    const request: ProductoRequestDTO = this.formularioProducto.value;

    this.productoServicio.crearProductoService(request).subscribe({
      next: (data) => {
        this.productoCreado.emit(data)
        this.closeModal();
        console.log('Producto Creado')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}