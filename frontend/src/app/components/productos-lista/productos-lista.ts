import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-lista.html',
  styleUrl: './productos-lista.css'
})
export class ProductosListaComponent {
  productos: Producto[] = [];

  @Input() editarProducto!: (producto: Producto) => void;

  constructor(private productoService: ProductoService) {
    this.productos = this.productoService.obtenerProductos();
  }
}