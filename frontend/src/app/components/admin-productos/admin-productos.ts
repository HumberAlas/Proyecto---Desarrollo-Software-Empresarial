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
<<<<<<< HEAD
  @Input() crearProducto!: () => void;
  @Input() vistaActual = '';
=======
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7

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
<<<<<<< HEAD
  productosPorPagina = 8;
=======
  productosPorPagina = 6;
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
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

<<<<<<< HEAD
        this.cargarFiltrosDesdeProductos();
        this.aplicarFiltros(false);
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar los productos.';
=======
        this.productosFiltrados = [...this.productos];

        this.cargarFiltros();
        this.actualizarPaginacion();
      },
      error: () => {
        this.mensaje = 'Error al cargar productos desde el backend.';
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
      }
    });
  }

<<<<<<< HEAD
  nuevoProducto(): void {
  if (this.crearProducto) {
    this.crearProducto();
    return;
  }

  if (this.cambiarVista) {
    this.cambiarVista('admin-crear-producto');
  }
}

esStockBajo(producto: any): boolean {
  const stock = this.obtenerStock(producto);
  return stock > 0 && stock < 10;
}

esSinStock(producto: any): boolean {
  const stock = this.obtenerStock(producto);
  return stock <= 0;
}

obtenerClaseStock(producto: any): string {
  const stock = this.obtenerStock(producto);

  if (stock <= 0) {
    return 'stock-sin';
  }

  if (stock < 10) {
    return 'stock-bajo';
  }

  return 'stock-normal';
}

obtenerTextoStock(producto: any): string {
  const stock = this.obtenerStock(producto);

  if (stock <= 0) {
    return 'Sin stock';
  }

  if (stock < 10) {
    return 'Stock bajo';
  }

  return 'Stock normal';
}

  cargarFiltrosDesdeProductos(): void {
    this.categorias = [...new Set(
      this.productos
        .map(producto => this.obtenerCategoria(producto))
        .filter(valor => valor)
    )];

    this.marcas = [...new Set(
      this.productos
        .map(producto => this.obtenerMarca(producto))
        .filter(valor => valor)
    )];
  }

  aplicarFiltros(resetearPagina: boolean = true): void {
    const texto = this.buscarProducto.trim().toLowerCase();
=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7

    this.productosFiltrados = this.productos.filter(producto => {
      const nombre = this.obtenerNombre(producto).toLowerCase();
      const sku = this.obtenerSku(producto).toLowerCase();
      const categoria = this.obtenerCategoria(producto);
      const marca = this.obtenerMarca(producto);
<<<<<<< HEAD
      const estado = this.obtenerEstado(producto);
      const precio = this.obtenerPrecio(producto);

      const coincideTexto =
        !texto ||
        nombre.includes(texto) ||
        sku.includes(texto);

      const coincideCategoria =
        !this.filtroCategoria ||
        categoria === this.filtroCategoria;

      const coincideMarca =
        !this.filtroMarca ||
        marca === this.filtroMarca;

      const coincideEstado =
        this.filtroEstado === '' ||
        String(estado) === this.filtroEstado;

      const coincidePrecio = precio <= Number(this.filtroPrecio);

      return coincideTexto && coincideCategoria && coincideMarca && coincideEstado && coincidePrecio;
    });

    if (resetearPagina) {
      this.paginaActual = 1;
    }

=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    this.actualizarPaginacion();
  }

  eliminarFiltros(): void {
    this.buscarProducto = '';
    this.filtroCategoria = '';
    this.filtroMarca = '';
    this.filtroEstado = '';
    this.filtroPrecio = 2000;
<<<<<<< HEAD
    this.paginaActual = 1;

    this.aplicarFiltros();
=======

    this.productosFiltrados = [...this.productos];
    this.paginaActual = 1;
    this.actualizarPaginacion();
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
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
<<<<<<< HEAD
    const confirmar = confirm(`¿Deseas desactivar el producto "${this.obtenerNombre(producto)}"?`);

    if (!confirmar) return;

    const id = this.obtenerId(producto);

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.mensaje = 'Producto desactivado correctamente.';
        this.cargarProductos();
      },
      error: (error: any) => {
        this.mensaje = error.error?.mensaje || 'No se pudo desactivar el producto.';
=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
      }
    });
  }

  obtenerId(producto: any): string {
<<<<<<< HEAD
    return String(
      producto?.ProductoID ??
      producto?.productoID ??
      producto?.ProductoId ??
      producto?.productoId ??
      producto?._id ??
      producto?.id ??
      ''
    );
  }

  obtenerNombre(producto: any): string {
    return producto?.Nombre || producto?.nombre || 'Producto sin nombre';
  }

  obtenerPrecio(producto: any): number {
    return Number(producto?.Precio ?? producto?.precio ?? 0);
  }

  obtenerStock(producto: any): number {
    return Number(producto?.Stock ?? producto?.stock ?? 0);
  }

  obtenerCategoria(producto: any): string {
    return producto?.Categoria || producto?.categoria || producto?.NombreCategoria || producto?.nombreCategoria || '';
  }

  obtenerMarca(producto: any): string {
    return producto?.Marca || producto?.marca || producto?.NombreMarca || producto?.nombreMarca || '';
  }

  obtenerProveedor(producto: any): string {
    return producto?.Proveedor || producto?.proveedor || producto?.NombreProveedor || producto?.nombreProveedor || '';
  }

  obtenerSku(producto: any): string {
    return producto?.SKU || producto?.sku || 'N/A';
  }

  obtenerDescripcion(producto: any): string {
    return producto?.Descripcion || producto?.descripcion || 'Sin descripción';
  }

  obtenerEstado(producto: any): boolean {
    if (producto?.Estado !== undefined) return Boolean(producto.Estado);
    if (producto?.estado !== undefined) return Boolean(producto.estado);
=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    return true;
  }

  obtenerImagen(producto: any): string {
<<<<<<< HEAD
    const imagen =
      producto?.Imagen ||
      producto?.imagen ||
      producto?.UrlImagen ||
      producto?.urlImagen ||
      '';

    if (!imagen) return 'assets/img/EasyCommerce.png';
    if (imagen.startsWith('http')) return imagen;
    if (imagen.startsWith('data:image')) return imagen;
    if (imagen.startsWith('assets/')) return imagen;
    if (imagen.startsWith('/')) return `http://localhost:3000${imagen}`;

    return imagen;
=======
    return producto.imagen || producto.Imagen || 'assets/img/EasyCommerce.png';
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
  }
}