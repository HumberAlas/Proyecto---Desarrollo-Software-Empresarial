import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-lista.html',
  styleUrl: './productos-lista.css'
})
export class ProductosListaComponent implements OnInit {
  @Input() editarProducto!: (producto: any) => void;

  productos: any[] = [];
  productosFiltrados: any[] = [];
  productosPaginados: any[] = [];

  categorias: string[] = [];
  marcas: string[] = [];

  filtroCategoria = '';
  filtroMarca = '';
  filtroPrecio = 2000;

  paginaActual = 1;
  productosPorPagina = 6;
  totalPaginas = 1;

  mensaje = '';
  mostrarModalLogin = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (respuesta: any) => {
        this.productos = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];

        this.productosFiltrados = [...this.productos];

        this.cargarFiltrosDesdeProductos();
        this.actualizarPaginacion();
      },
      error: () => {
        this.mensaje = 'Error al cargar productos desde el backend.';
      }
    });
  }

  cargarFiltrosDesdeProductos(): void {
    const categoriasSet = new Set<string>();
    const marcasSet = new Set<string>();

    this.productos.forEach((producto) => {
      const categoria = this.obtenerCategoria(producto);
      const marca = this.obtenerMarca(producto);

      if (categoria) categoriasSet.add(categoria);
      if (marca) marcasSet.add(marca);
    });

    this.categorias = Array.from(categoriasSet);
    this.marcas = Array.from(marcasSet);
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const categoria = this.obtenerCategoria(producto);
      const marca = this.obtenerMarca(producto);
      const precio = this.obtenerPrecio(producto);

      const coincideCategoria = !this.filtroCategoria || categoria === this.filtroCategoria;
      const coincideMarca = !this.filtroMarca || marca === this.filtroMarca;
      const coincidePrecio = precio <= this.filtroPrecio;

      return coincideCategoria && coincideMarca && coincidePrecio;
    });

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  eliminarFiltros(): void {
    this.filtroCategoria = '';
    this.filtroMarca = '';
    this.filtroPrecio = 2000;
    this.productosFiltrados = [...this.productos];
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  actualizarPaginacion(): void {
    this.totalPaginas = Math.ceil(this.productosFiltrados.length / this.productosPorPagina) || 1;

    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;

    this.productosPaginados = this.productosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  obtenerPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, index) => index + 1);
  }

  agregarAlCarrito(producto: any): void {
    if (!this.estaLogueado()) {
      this.mostrarModalLogin = true;
      return;
    }

    alert(`Producto agregado al carrito: ${this.obtenerNombre(producto)}`);
  }

  agregarAFavoritos(producto: any): void {
    if (!this.estaLogueado()) {
      this.mostrarModalLogin = true;
      return;
    }

    alert(`Producto agregado a favoritos: ${this.obtenerNombre(producto)}`);
  }

  cerrarModalLogin(): void {
    this.mostrarModalLogin = false;
  }

  irALogin(): void {
    this.mostrarModalLogin = false;
    localStorage.clear();
    window.location.reload();
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerId(producto: any): string {
    return producto.productoId || producto.ProductoId || producto._id || producto.id || '';
  }

  obtenerNombre(producto: any): string {
    return producto.nombre || producto.Nombre || 'Producto sin nombre';
  }

  obtenerDescripcion(producto: any): string {
    return producto.descripcion || producto.Descripcion || 'Sin descripción disponible.';
  }

  obtenerPrecio(producto: any): number {
    return Number(producto.precio || producto.Precio || 0);
  }

  obtenerStock(producto: any): number {
    return Number(producto.stock || producto.Stock || 0);
  }

  obtenerCategoria(producto: any): string {
    return producto.categoria || producto.Categoria || producto.nombreCategoria || producto.NombreCategoria || '';
  }

  obtenerMarca(producto: any): string {
    return producto.marca || producto.Marca || producto.nombreMarca || producto.NombreMarca || '';
  }

  obtenerImagen(producto: any): string {
    return producto.imagen || producto.Imagen || 'assets/img/EasyCommerce.png';
  }
}