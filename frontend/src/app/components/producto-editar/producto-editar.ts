import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-editar.component.html',
  styleUrl: './producto-editar.component.css'
})
export class ProductoEditarComponent {
  producto: Producto = {
    id: 1,
    nombre: '',
    precio: 0,
    stock: 0
  };

  mensaje = '';

  constructor(private productoService: ProductoService) {
    const productoEncontrado = this.productoService.obtenerProductoPorId(1);
    if (productoEncontrado) {
      this.producto = { ...productoEncontrado };
    }
  }

  actualizarProducto(): void {
    if (!this.producto.nombre || this.producto.precio <= 0 || this.producto.stock < 0) {
      this.mensaje = 'Complete correctamente todos los campos.';
      return;
    }

    this.productoService.actualizarProducto(this.producto);
    this.mensaje = 'Producto actualizado correctamente.';
  }
}