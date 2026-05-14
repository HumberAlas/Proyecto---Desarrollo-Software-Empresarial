<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FiltrosProducto {
  categoriaId?: string;
  marcaId?: string;
  busqueda?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private terminoBusquedaSubject = new BehaviorSubject<string>('');
  terminoBusqueda$ = this.terminoBusquedaSubject.asObservable();

  private filtrosProductoSubject = new BehaviorSubject<FiltrosProducto>({});
  filtrosProducto$ = this.filtrosProductoSubject.asObservable();

  establecerBusqueda(termino: string): void {
    this.terminoBusquedaSubject.next(termino);
    this.filtrosProductoSubject.next({
      busqueda: termino
    });
  }

  establecerFiltroCategoria(categoriaId: string): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({
      categoriaId
    });
  }

  establecerFiltroMarca(marcaId: string): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({
      marcaId
    });
  }

  limpiarBusqueda(): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({});
  }

  obtenerBusquedaActual(): string {
    return this.terminoBusquedaSubject.value;
  }

  obtenerFiltrosActuales(): FiltrosProducto {
    return this.filtrosProductoSubject.value;
  }
=======
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FiltrosProducto {
  categoriaId?: string;
  marcaId?: string;
  busqueda?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private terminoBusquedaSubject = new BehaviorSubject<string>('');
  terminoBusqueda$ = this.terminoBusquedaSubject.asObservable();

  private filtrosProductoSubject = new BehaviorSubject<FiltrosProducto>({});
  filtrosProducto$ = this.filtrosProductoSubject.asObservable();

  establecerBusqueda(termino: string): void {
    this.terminoBusquedaSubject.next(termino);
    this.filtrosProductoSubject.next({
      busqueda: termino
    });
  }

  establecerFiltroCategoria(categoriaId: string): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({
      categoriaId
    });
  }

  establecerFiltroMarca(marcaId: string): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({
      marcaId
    });
  }

  limpiarBusqueda(): void {
    this.terminoBusquedaSubject.next('');
    this.filtrosProductoSubject.next({});
  }

  obtenerBusquedaActual(): string {
    return this.terminoBusquedaSubject.value;
  }

  obtenerFiltrosActuales(): FiltrosProducto {
    return this.filtrosProductoSubject.value;
  }
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
}