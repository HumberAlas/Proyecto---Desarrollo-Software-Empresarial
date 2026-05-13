import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css'
})
export class AdminProductosComponent implements OnInit {
  @Input() cambiarVista!: (vista: string) => void;
  @Input() cerrarSesion!: () => void;
  @Input() editarProducto!: (producto: any) => void;

  productos: any[] = [];
  productosFiltrados: any[] = [];
  productosPaginados: any[] = [];

  categorias: string[] = [];
  marcas: string[] = [];

  buscarProducto = '';
  filtroCategoria = '';
  filtroMarca = '';
  filtroEstado = '';
  filtroPrecio = 2000;

  paginaActual = 1;
  productosPorPagina = 6;
  totalPaginas = 1;

  mensaje = '';

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

        this.cargarFiltros();
        this.actualizarPaginacion();
      },
      error: () => {
        this.mensaje = 'Error al cargar productos desde el backend.';
      }
    });
  }

  cargarFiltros(): void {
    const categoriasSet = new Set<string>();
    const marcasSet = new Set<string>();

    this.productos.forEach(producto => {
      const categoria = this.obtenerCategoria(producto);
      const marca = this.obtenerMarca(producto);

      if (categoria) categoriasSet.add(categoria);
      if (marca) marcasSet.add(marca);
    });

    this.categorias = Array.from(categoriasSet);
    this.marcas = Array.from(marcasSet);
  }

  aplicarFiltros(): void {
    const busqueda = this.buscarProducto.trim().toLowerCase();

    this.productosFiltrados = this.productos.filter(producto => {
      const nombre = this.obtenerNombre(producto).toLowerCase();
      const sku = this.obtenerSku(producto).toLowerCase();
      const categoria = this.obtenerCategoria(producto);
      const marca = this.obtenerMarca(producto);
      const estado = String(this.obtenerEstado(producto));
      const precio = this.obtenerPrecio(producto);

      const coincideBusqueda = !busqueda || nombre.includes(busqueda) || sku.includes(busqueda);
      const coincideCategoria = !this.filtroCategoria || categoria === this.filtroCategoria;
      const coincideMarca = !this.filtroMarca || marca === this.filtroMarca;
      const coincideEstado = !this.filtroEstado || estado === this.filtroEstado;
      const coincidePrecio = precio <= this.filtroPrecio;

      return coincideBusqueda && coincideCategoria && coincideMarca && coincideEstado && coincidePrecio;
    });

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  eliminarFiltros(): void {
    this.buscarProducto = '';
    this.filtroCategoria = '';
    this.filtroMarca = '';
    this.filtroEstado = '';
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

  irA(vista: string, event?: Event): void {
    if (event) event.preventDefault();

    if (this.cambiarVista) {
      this.cambiarVista(vista);
    }
  }

  logout(event: Event): void {
    event.preventDefault();

    if (this.cerrarSesion) {
      this.cerrarSesion();
    }
  }

  editar(producto: any): void {
    if (this.editarProducto) {
      this.editarProducto(producto);
    }
  }

  eliminarProducto(producto: any): void {
    const id = this.obtenerId(producto);

    if (!id) {
      alert('No se encontró el ID del producto.');
      return;
    }

    const confirmar = confirm(`¿Desea eliminar el producto "${this.obtenerNombre(producto)}"?`);

    if (!confirmar) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente.');
        this.cargarProductos();
      },
      error: () => {
        alert('Error al eliminar producto.');
      }
    });
  }

  obtenerId(producto: any): string {
    return producto.productoId || producto.ProductoId || producto._id || producto.id || '';
  }

  obtenerNombre(producto: any): string {
    return producto.nombre || producto.Nombre || 'Sin nombre';
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

  obtenerProveedor(producto: any): string {
    return producto.proveedor || producto.Proveedor || producto.nombreProveedor || producto.NombreProveedor || '';
  }

  obtenerSku(producto: any): string {
    return producto.sku || producto.SKU || producto.codigo || producto.Codigo || 'N/A';
  }

  obtenerDescripcion(producto: any): string {
    return producto.descripcion || producto.Descripcion || 'Sin descripción';
  }

  obtenerEstado(producto: any): boolean {
    if (producto.estado !== undefined) return producto.estado;
    if (producto.Estado !== undefined) return producto.Estado;
    return true;
  }

  obtenerImagen(producto: any): string {
    return producto.imagen || producto.Imagen || 'assets/img/EasyCommerce.png';
  }
}