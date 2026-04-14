import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-crear.html',
  styleUrl: './producto-crear.css'
})
export class ProductoCrearComponent {
  nombre = '';
  precio = 0;
  stock = 0;
  mensaje = '';

  constructor(private productoService: ProductoService) {}

  guardarProducto(): void {
  if (
    !this.nombre ||
    this.precio <= 0 ||
    this.stock < 0 ||
    !Number.isInteger(this.stock)
  ) {
    this.mensaje = 'Complete correctamente todos los campos. El stock debe ser un número entero.';
    return;
  }

  const nuevoProducto = {
    id: this.productoService.obtenerSiguienteId(),
    nombre: this.nombre,
    precio: this.precio,
    stock: this.stock
  };

  this.productoService.agregarProducto(nuevoProducto);
  this.mensaje = 'Producto creado correctamente.';

  this.nombre = '';
  this.precio = 0;
  this.stock = 0;
}
}
