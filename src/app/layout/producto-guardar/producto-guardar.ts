import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductoResponseDTO } from '../../core/interfaces/productoResponseDTO.interface';
import { Producto } from '../../core/services/producto/producto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoRequestDTO } from '../../core/interfaces/productoRequestoDTO.interface';
import { ProductoUpdateDTO } from '../../core/interfaces/productoUpdateDTO.interface';

@Component({
  selector: 'app-producto-guardar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './producto-guardar.html',
  styleUrl: './producto-guardar.css',
})
export class ProductoGuardar implements OnInit, OnChanges{

  private productoServicio = inject(Producto);
  private construirFormulario = inject(FormBuilder);
  
  public formularioProducto!: FormGroup;

  @Input() isOpen = false;
  @Input() titulo = 'Registrar Producto';
  @Input() modo: 'create' | 'edit' = 'create'
  @Input() productoObtenido?: ProductoResponseDTO

  @Output() productoCreado = new EventEmitter<ProductoResponseDTO>();
  @Output() closed = new EventEmitter<void>();
  @Output() productoActualizado = new EventEmitter<ProductoResponseDTO>();

  // Metodo para cerrar el modal
  public closeModal(){
    this.isOpen = false;
    this.closed.emit();
  }

  ngOnInit(): void {
    this.formularioProducto = this.construirFormulario.group({
      nombreProducto: ['', [Validators.required, Validators.min(3), Validators.max(50)]],
      precioCompra: [0, Validators.required],
      precioVenta: [0, Validators.required],
      proveedor: ['', Validators.required],
      stock: [0, Validators.required],
      idCategoria: [0, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modo']){
      this.desabilitarCampos();
    }
    if (changes['productoEditar'] && this.productoObtenido && this.modo === 'edit'){
      this.configurarFormularioEdicion();
    }
    if (changes['modo'] && this.modo === 'create'){
      this.vaciarFormulario()
    }
  }

  private configurarFormularioEdicion(){
    if (!this.productoObtenido) return;

    this.formularioProducto.patchValue({
      nombreProducto: this.productoObtenido.nombreProducto,
      precioCompra: this.productoObtenido.precioCompra,
      precioVenta: this.productoObtenido.precioVenta,
      proveedor: this.productoObtenido.proveedor,
      stock: this.productoObtenido.stock,
      idCategoria: this.productoObtenido.idCategoria
    })
  }

  private desabilitarCampos(){
    if (this.modo === 'edit'){
      this.formularioProducto.get('precioCompra')?.disable();
      this.formularioProducto.get('stock')?.disable();
      this.formularioProducto.get('idCategoria')?.disable();
    }else{
      this.formularioProducto.enable() // Modo crear 
    }
  }

  private vaciarFormulario(){
    this.formularioProducto.reset({
      nombreProducto: '',
      precioCompra: 0,
      precioVenta: 0,
      proveedor: '',
      stock: 0,
      idCategoria: 0
    })
  }

  // Metodo para ejecutar segun el requirimiento 
  public requerimiento(){
    if (this.modo === 'create'){
      this.guardarProducto()
    }else{
      this.actualizarProducto();
    }
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

  public actualizarProducto(){
    if (this.formularioProducto.invalid || !this.productoObtenido) return

    const update: ProductoUpdateDTO = {
      idProducto: this.productoObtenido.idProducto,
      nombreProducto: this.productoObtenido.nombreProducto,
      precioVenta: this.productoObtenido.precioVenta,
      proveedorProducto: this.productoObtenido.proveedor,
    }

    this.productoServicio.actualizarProductoService(update.idProducto, update).subscribe({
      next: (data) => {
        this.productoActualizado.emit(data)
        this.closeModal();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}