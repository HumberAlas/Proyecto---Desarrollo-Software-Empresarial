import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-admin-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-producto-form.html',
  styleUrl: './admin-producto-form.css'
})
export class AdminProductoFormComponent implements OnChanges {
  @Input() productoSeleccionado: any | null = null;
  @Input() cambiarVista!: (vista: string) => void;

  modoEdicion = false;
  mensaje = '';
  mensajeError = '';

  imagenesSeleccionadas: File[] = [];
  imagenesPreview: string[] = [];

  producto = {
    productoId: '',
    nombre: '',
    precio: 0,
    stock: 0,
    categoriaId: '',
    marcaId: '',
    proveedorId: '',
    descripcion: '',
    imagen: '',
    estado: true
  };

  categorias = [
    { id: 'laptops', nombre: 'Laptops' },
    { id: 'perifericos', nombre: 'Periféricos' },
    { id: 'pantallas', nombre: 'Pantallas' },
    { id: 'almacenamiento', nombre: 'Almacenamiento' }
  ];

  marcas = [
    { id: 'asus', nombre: 'Asus' },
    { id: 'lenovo', nombre: 'Lenovo' },
    { id: 'hp', nombre: 'HP' },
    { id: 'dell', nombre: 'Dell' }
  ];

  proveedores = [
    { id: 'proveedor1', nombre: 'Proveedor Principal' },
    { id: 'proveedor2', nombre: 'Distribuidora Central' },
    { id: 'proveedor3', nombre: 'Importadora Tech' }
  ];

  constructor(private productoService: ProductoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoSeleccionado']) {
      this.cargarProductoSeleccionado();
    }
  }

  cargarProductoSeleccionado(): void {
    if (!this.productoSeleccionado) {
      this.modoEdicion = false;
      this.limpiarFormulario();
      return;
    }

    this.modoEdicion = true;

    this.producto = {
      productoId:
        this.productoSeleccionado.productoId ||
        this.productoSeleccionado.ProductoId ||
        this.productoSeleccionado._id ||
        this.productoSeleccionado.id ||
        '',

      nombre:
        this.productoSeleccionado.nombre ||
        this.productoSeleccionado.Nombre ||
        '',

      precio:
        Number(this.productoSeleccionado.precio || this.productoSeleccionado.Precio || 0),

      stock:
        Number(this.productoSeleccionado.stock || this.productoSeleccionado.Stock || 0),

      categoriaId:
        this.productoSeleccionado.categoriaId ||
        this.productoSeleccionado.CategoriaId ||
        '',

      marcaId:
        this.productoSeleccionado.marcaId ||
        this.productoSeleccionado.MarcaId ||
        '',

      proveedorId:
        this.productoSeleccionado.proveedorId ||
        this.productoSeleccionado.ProveedorId ||
        '',

      descripcion:
        this.productoSeleccionado.descripcion ||
        this.productoSeleccionado.Descripcion ||
        '',

      imagen:
        this.productoSeleccionado.imagen ||
        this.productoSeleccionado.Imagen ||
        '',

      estado:
        this.productoSeleccionado.estado !== undefined
          ? this.productoSeleccionado.estado
          : this.productoSeleccionado.Estado !== undefined
            ? this.productoSeleccionado.Estado
            : true
    };

    this.imagenesPreview = this.producto.imagen
      ? [this.producto.imagen]
      : [];
  }

  seleccionarImagenes(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.imagenesSeleccionadas = Array.from(input.files);
    this.imagenesPreview = [];

    this.imagenesSeleccionadas.forEach((archivo) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imagenesPreview.push(reader.result);
        }
      };

      reader.readAsDataURL(archivo);
    });

    // Como tu backend actual acepta una propiedad imagen tipo string,
    // usamos la primera imagen en base64 para previsualización y guardado simple.
    const primerArchivo = this.imagenesSeleccionadas[0];
    const readerPrincipal = new FileReader();

    readerPrincipal.onload = () => {
      if (typeof readerPrincipal.result === 'string') {
        this.producto.imagen = readerPrincipal.result;
      }
    };

    readerPrincipal.readAsDataURL(primerArchivo);
  }

  guardarProducto(): void {
    this.limpiarMensajes();

    if (!this.validarFormulario()) {
      return;
    }

    const productoEnviar = {
      productoId: this.producto.productoId,
      ProductoId: this.producto.productoId,
      nombre: this.producto.nombre,
      Nombre: this.producto.nombre,
      precio: Number(this.producto.precio),
      Precio: Number(this.producto.precio),
      stock: Number(this.producto.stock),
      Stock: Number(this.producto.stock),
      categoriaId: this.producto.categoriaId,
      CategoriaId: this.producto.categoriaId,
      marcaId: this.producto.marcaId,
      MarcaId: this.producto.marcaId,
      proveedorId: this.producto.proveedorId,
      ProveedorId: this.producto.proveedorId,
      descripcion: this.producto.descripcion,
      Descripcion: this.producto.descripcion,
      imagen: this.producto.imagen,
      Imagen: this.producto.imagen,
      estado: this.producto.estado,
      Estado: this.producto.estado
    };

    if (this.modoEdicion) {
      this.productoService.actualizarProducto(productoEnviar).subscribe({
        next: () => {
          this.mensaje = 'Producto actualizado correctamente.';

          setTimeout(() => {
            this.volverAProductos();
          }, 1000);
        },
        error: (error: any) => {
          this.mensajeError = error.error?.mensaje || 'Error al actualizar producto.';
        }
      });

      return;
    }

    this.productoService.crearProducto(productoEnviar).subscribe({
      next: () => {
        this.mensaje = 'Producto registrado correctamente.';
        this.limpiarFormulario();
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'Error al registrar producto.';
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.producto.nombre.trim()) {
      this.mensajeError = 'El nombre del producto es obligatorio.';
      return false;
    }

    if (Number(this.producto.precio) <= 0) {
      this.mensajeError = 'El precio debe ser mayor a 0.';
      return false;
    }

    if (!Number.isInteger(Number(this.producto.stock)) || Number(this.producto.stock) < 0) {
      this.mensajeError = 'El stock debe ser un número entero mayor o igual a 0.';
      return false;
    }

    if (!this.producto.categoriaId) {
      this.mensajeError = 'Debe seleccionar una categoría.';
      return false;
    }

    if (!this.producto.marcaId) {
      this.mensajeError = 'Debe seleccionar una marca.';
      return false;
    }

    if (!this.producto.proveedorId) {
      this.mensajeError = 'Debe seleccionar un proveedor.';
      return false;
    }

    if (!this.producto.descripcion.trim()) {
      this.mensajeError = 'La descripción es obligatoria.';
      return false;
    }

    if (!this.modoEdicion && !this.producto.imagen) {
      this.mensajeError = 'Debe seleccionar al menos una imagen.';
      return false;
    }

    return true;
  }

  cancelar(): void {
    this.volverAProductos();
  }

  volverAProductos(): void {
    if (this.cambiarVista) {
      this.cambiarVista('admin-productos');
    }
  }

  limpiarFormulario(): void {
    this.producto = {
      productoId: '',
      nombre: '',
      precio: 0,
      stock: 0,
      categoriaId: '',
      marcaId: '',
      proveedorId: '',
      descripcion: '',
      imagen: '',
      estado: true
    };

    this.imagenesSeleccionadas = [];
    this.imagenesPreview = [];
  }

  limpiarMensajes(): void {
    this.mensaje = '';
    this.mensajeError = '';
  }
}