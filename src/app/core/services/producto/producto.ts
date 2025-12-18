import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductoRequestDTO } from '../../interfaces/productoRequestoDTO.interface';
import { Observable } from 'rxjs';
import { ProductoResponseDTO } from '../../interfaces/productoResponseDTO.interface';
import { ProductoListarDTO } from '../../interfaces/productoListarDTO.interface';
import { ProductoUpdateDTO } from '../../interfaces/productoUpdateDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class Producto {

  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/producto/';

  // Servicio para crear un nuevo producto
  crearProductoService(request: ProductoRequestDTO): Observable<ProductoResponseDTO>{
    return this.http.post<ProductoResponseDTO>(`${this.url}crearProducto`, request);
  }

  // Servicio para listar a todos los productos
  listarProductosService(): Observable<ProductoListarDTO[]>{
    return this.http.get<ProductoListarDTO[]>(`${this.url}listarProductos`)
  }

  // Servicio para buscar por id
  buscarProductoService(idProducto: number): Observable<ProductoResponseDTO>{
    return this.http.get<ProductoResponseDTO>(`${this.url}buscarProducto/${idProducto}`)
  }

  // Servicio para actualizar un producto
  actualizarProductoService(idProducto: number, update: ProductoUpdateDTO): Observable<ProductoResponseDTO>{
    return this.http.put<ProductoResponseDTO>(`${this.url}actualizarProducto/${idProducto}`, update);
  }
}