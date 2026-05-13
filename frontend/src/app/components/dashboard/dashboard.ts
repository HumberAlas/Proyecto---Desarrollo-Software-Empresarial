import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  @Input() cambiarVista!: (vista: string) => void;

  laptopsNuevas: any[] = [];
  productosAsus: any[] = [];
  mensajeError = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductosInicio();
  }

  cargarProductosInicio(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (respuesta: any) => {
        const productos = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];

        this.laptopsNuevas = productos.slice(0, 4);

        this.productosAsus = productos
          .filter((producto: any) => {
            const marca = producto.marca || producto.Marca || producto.nombreMarca || producto.NombreMarca || '';
            const nombre = producto.nombre || producto.Nombre || '';
            return marca.toLowerCase().includes('asus') || nombre.toLowerCase().includes('asus');
          })
          .slice(0, 4);

        if (this.productosAsus.length === 0) {
          this.productosAsus = productos.slice(0, 4);
        }
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los productos desde el backend.';
      }
    });
  }

  verProductos(): void {
    if (this.cambiarVista) {
      this.cambiarVista('lista');
    }
  }

  obtenerNombre(producto: any): string {
    return producto.nombre || producto.Nombre || 'Producto sin nombre';
  }

  obtenerDescripcion(producto: any): string {
    return producto.descripcion || producto.Descripcion || 'Producto tecnológico disponible.';
  }

  obtenerPrecio(producto: any): number {
    return producto.precio || producto.Precio || 0;
  }

  obtenerImagen(producto: any): string {
    return producto.imagen || producto.Imagen || 'assets/img/EasyCommerce.png';
  }
}