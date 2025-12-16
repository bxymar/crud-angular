import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductoRequestDTO } from '../../interfaces/productoRequestoDTO.interface';
import { Observable } from 'rxjs';
import { ProductoResponseDTO } from '../../interfaces/productoResponseDTO.interface';

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


}