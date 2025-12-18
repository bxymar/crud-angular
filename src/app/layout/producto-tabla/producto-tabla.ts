import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoListarDTO } from '../../core/interfaces/productoListarDTO.interface';

@Component({
  selector: 'app-producto-tabla',
  imports: [],
  templateUrl: './producto-tabla.html',
  styleUrl: './producto-tabla.css',
})
export class ProductoTabla {

  @Input() listaProductos: ProductoListarDTO[] = [];

  // Enviar id del producto
  @Output() editarProducto = new EventEmitter<number>();
}