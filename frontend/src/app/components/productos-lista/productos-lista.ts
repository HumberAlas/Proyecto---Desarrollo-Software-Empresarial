import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from "../../../services/producto.service";
import { Producto } from '../../../models/producto.model';

@Component({
selector: 'app-productos-lista',
standalone: true,
imports: [CommonModule],
templateUrl: './productos-lista.component.html',
styleUrl: './productos-lista.component.css'
})
export class ProductosListaComponent {
productos: Producto[] = [];

constructor(private productoService: ProductoService) {
this.productos = this.productoService.obtenerProductos();
}
}