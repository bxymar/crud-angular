import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductoTabla } from '../producto-tabla/producto-tabla';
import { ProductoCard } from '../producto-card/producto-card';
import { ProductoGuardar } from '../producto-guardar/producto-guardar';
import { Producto } from '../../core/services/producto/producto';
import { ProductoListarDTO } from '../../core/interfaces/productoListarDTO.interface';
import { ProductoResponseDTO } from '../../core/interfaces/productoResponseDTO.interface';

@Component({
  selector: 'app-producto-presentacion',
  imports: [
    ProductoTabla,
    ProductoCard,
    ProductoGuardar
  ],
  templateUrl: './producto-presentacion.html',
  styleUrl: './producto-presentacion.css',
})
export class ProductoPresentacion implements OnInit{

  //Variable encargada de controlar si esta abierto el modal o no
  public showModal = false;

  //Observador ==> BreakpointObserver ==> @angular/cdk
  private observador = inject(BreakpointObserver);

  // Injectando el servicio
  private productoServicio = inject(Producto);

  listaProductos: ProductoListarDTO[] = [];
  productoObtenido?: ProductoResponseDTO;
  modo: 'create' | 'edit' = 'create'

  // Variable observable
  private esMovile$ = this.observador.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  )
  public esMovile = toSignal(this.esMovile$, {initialValue: false})


  // Metodo para abrir el modal
  public openModal(){
    this.modo = 'create';
    this.productoObtenido = undefined;
    this.showModal = true;
  }


  ngOnInit(): void {
    this.cargarProductos();
  }


  // Metodo encargado de listar a todos los productos
  public cargarProductos(){
    this.productoServicio.listarProductosService().subscribe({
      next: (data) =>{
        this.listaProductos = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  // Metodo para obtener el producto
  mandarProductoEncontrado(idProducto: number){
    this.productoServicio.buscarProductoService(idProducto).subscribe({
      next: (data) => {
        this.productoObtenido = data
        this.modo = 'edit'
        this.showModal = true
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}