import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductoTabla } from '../producto-tabla/producto-tabla';
import { ProductoCard } from '../producto-card/producto-card';
import { ProductoGuardar } from '../producto-guardar/producto-guardar';

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
export class ProductoPresentacion {

  //Variable encargada de controlar si esta abierto el modal o no
  public showModal = false;

  //Observador ==> BreakpointObserver ==> @angular/cdk
  private observador = inject(BreakpointObserver);

  // Variable observable
  private esMovile$ = this.observador.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches)
  )
  public esMovile = toSignal(this.esMovile$, {initialValue: false})


  // Metodo para abrir el modal
  public openModal(){
    this.showModal = true;
    //console.log('Funcionando')
  }
}