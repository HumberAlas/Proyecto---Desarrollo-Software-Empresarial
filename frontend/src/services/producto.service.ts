import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Teclado', precio: 25, stock: 10 },
    { id: 2, nombre: 'Mouse', precio: 15, stock: 20 },
    { id: 3, nombre: 'Monitor', precio: 180, stock: 5 }
  ];

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  actualizarProducto(productoActualizado: Producto): void {
    const index = this.productos.findIndex(p => p.id === productoActualizado.id);
    if (index !== -1) {
      this.productos[index] = productoActualizado;
    }
  }
}
