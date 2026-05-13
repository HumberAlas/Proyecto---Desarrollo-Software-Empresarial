import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ProductoService } from '../../../services/producto.service';
import { MetodoPagoService } from '../../../services/metodo-pago.service';

interface PedidoUsuario {
  carritoId: string | number;
  productoId: string | number;
  nombre: string;
  imagen: string;
  cantidad: number;
  precioUnitario: number;
  estado: string;
  fechaCompra: string | null;
}

interface MetodoPago {
  _id?: string;
  MetodoPagoID?: number;
  TipoTarjeta: string;
  Titular: string;
  UltimosDigitos: string;
  Expiracion: string;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css'
})
export class ConfiguracionComponent implements OnInit {
  seccionActiva: 'cuenta' | 'pedidos' | 'historial' | 'pagos' = 'cuenta';

  usuarioId = localStorage.getItem('usuarioId') || '';

  usuario = {
    nombre: '',
    correo: '',
    direccion: '',
    contacto: ''
  };

  passwordActual = '';
  nuevaPassword = '';
  confirmarPassword = '';
  mostrarCambioPassword = false;

  pedidosActivos: PedidoUsuario[] = [];
  historialPedidos: PedidoUsuario[] = [];
  metodosPago: MetodoPago[] = [];

  nuevoMetodoPago = {
    TipoTarjeta: 'Crédito',
    Titular: '',
    NumeroTarjeta: '',
    Expiracion: ''
  };

  cargando = false;
  mensaje = '';
  mensajeError = '';

  constructor(
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cambiarSeccion(seccion: 'cuenta' | 'pedidos' | 'historial' | 'pagos'): void {
    this.seccionActiva = seccion;
    this.limpiarMensajes();

    if (seccion === 'pedidos') {
      this.cargarPedidosActivos();
    }

    if (seccion === 'historial') {
      this.cargarHistorialPedidos();
    }

    if (seccion === 'pagos') {
      this.cargarMetodosPago();
    }
  }

  cargarUsuario(): void {
    if (!this.usuarioId) {
      this.mensajeError = 'No se encontró el usuario en sesión.';
      return;
    }

    this.cargando = true;

    this.usuarioService.obtenerUsuarioPorId(this.usuarioId).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        const data = respuesta.data || respuesta;

        this.usuario = {
          nombre: data.nombre || '',
          correo: data.correo || '',
          direccion: data.direccion || '',
          contacto: data.contacto || ''
        };
      },
      error: (error: any) => {
        this.cargando = false;
        this.mensajeError = error.error?.mensaje || 'No se pudieron cargar los datos del usuario.';
      }
    });
  }

  guardarCambios(): void {
    this.limpiarMensajes();

    if (!this.usuario.nombre.trim()) {
      this.mensajeError = 'El nombre no puede quedar vacío.';
      return;
    }

    if (!this.usuario.correo.trim()) {
      this.mensajeError = 'El correo no puede quedar vacío.';
      return;
    }

    const datos = {
      UsuarioID: this.usuarioId,
      nombre: this.usuario.nombre.trim(),
      correo: this.usuario.correo.trim(),
      direccion: this.usuario.direccion.trim(),
      contacto: this.usuario.contacto.trim()
    };

    this.usuarioService.actualizarUsuario(datos).subscribe({
      next: (respuesta: any) => {
        const data = respuesta.data || respuesta;

        localStorage.setItem('nombreUsuario', data.nombre || this.usuario.nombre);
        localStorage.setItem('correo', data.correo || this.usuario.correo);

        this.mensaje = 'Datos actualizados correctamente.';
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudieron guardar los cambios.';
      }
    });
  }

  alternarCambioPassword(): void {
    this.mostrarCambioPassword = !this.mostrarCambioPassword;

    if (!this.mostrarCambioPassword) {
      this.limpiarCamposPassword();
    }
  }

  cambiarPassword(): void {
    this.limpiarMensajes();

    if (!this.passwordActual || !this.nuevaPassword || !this.confirmarPassword) {
      this.mensajeError = 'Debe completar todos los campos de contraseña.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensajeError = 'La nueva contraseña no coincide con la confirmación.';
      return;
    }

    if (this.nuevaPassword.length < 6) {
      this.mensajeError = 'La nueva contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const data = {
      UsuarioID: this.usuarioId,
      passwordActual: this.passwordActual,
      nuevaPassword: this.nuevaPassword
    };

    this.usuarioService.cambiarPassword(data).subscribe({
      next: () => {
        this.mensaje = 'Contraseña actualizada correctamente.';
        this.limpiarCamposPassword();
        this.mostrarCambioPassword = false;
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudo cambiar la contraseña.';
      }
    });
  }

  cargarPedidosActivos(): void {
    if (!this.usuarioId) return;

    this.cargando = true;

    this.productoService.obtenerPedidosActivos(this.usuarioId).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        const datos = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];

        this.pedidosActivos = datos.map((item: any) => this.mapearPedido(item));
      },
      error: (error: any) => {
        this.cargando = false;
        this.mensajeError = error.error?.mensaje || 'No se pudieron cargar los pedidos activos.';
      }
    });
  }

  cargarHistorialPedidos(): void {
    if (!this.usuarioId) return;

    this.cargando = true;

    this.productoService.obtenerHistorialPedidos(this.usuarioId).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        const datos = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];

        this.historialPedidos = datos.map((item: any) => this.mapearPedido(item));
      },
      error: (error: any) => {
        this.cargando = false;
        this.mensajeError = error.error?.mensaje || 'No se pudo cargar el historial.';
      }
    });
  }

  cargarMetodosPago(): void {
    if (!this.usuarioId) return;

    this.cargando = true;

    this.metodoPagoService.obtenerMetodosPago(this.usuarioId).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;

        this.metodosPago = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];
      },
      error: (error: any) => {
        this.cargando = false;
        this.mensajeError = error.error?.mensaje || 'No se pudieron cargar los métodos de pago.';
      }
    });
  }

  agregarMetodoPago(): void {
    this.limpiarMensajes();

    if (
      !this.nuevoMetodoPago.TipoTarjeta ||
      !this.nuevoMetodoPago.Titular.trim() ||
      !this.nuevoMetodoPago.NumeroTarjeta.trim() ||
      !this.nuevoMetodoPago.Expiracion.trim()
    ) {
      this.mensajeError = 'Debe completar todos los datos de la tarjeta.';
      return;
    }

    const numeroLimpio = this.nuevoMetodoPago.NumeroTarjeta.replace(/\s/g, '');

    if (numeroLimpio.length < 12) {
      this.mensajeError = 'El número de tarjeta no parece válido.';
      return;
    }

    const data = {
      UsuarioID: this.usuarioId,
      TipoTarjeta: this.nuevoMetodoPago.TipoTarjeta,
      Titular: this.nuevoMetodoPago.Titular.trim(),
      NumeroTarjeta: numeroLimpio,
      Expiracion: this.nuevoMetodoPago.Expiracion.trim()
    };

    this.metodoPagoService.agregarMetodoPago(data).subscribe({
      next: () => {
        this.mensaje = 'Método de pago agregado correctamente.';

        this.nuevoMetodoPago = {
          TipoTarjeta: 'Crédito',
          Titular: '',
          NumeroTarjeta: '',
          Expiracion: ''
        };

        this.cargarMetodosPago();
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudo agregar el método de pago.';
      }
    });
  }

  eliminarMetodoPago(metodo: MetodoPago): void {
    const id = metodo.MetodoPagoID || metodo._id;

    if (!id) {
      this.mensajeError = 'No se encontró el ID del método de pago.';
      return;
    }

    const confirmar = confirm('¿Deseas eliminar este método de pago?');

    if (!confirmar) return;

    this.metodoPagoService.eliminarMetodoPago(id).subscribe({
      next: () => {
        this.mensaje = 'Método de pago eliminado correctamente.';
        this.cargarMetodosPago();
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudo eliminar el método de pago.';
      }
    });
  }

  mapearPedido(item: any): PedidoUsuario {
    return {
      carritoId: item.CarritoID || item.carritoId || item._id,
      productoId: item.ProductoID || item.productoId || '',
      nombre: item.NombreProducto || item.nombreProducto || 'Producto sin nombre',
      imagen: this.normalizarImagen(item.Imagen || item.imagen || ''),
      cantidad: Number(item.Cantidad || item.cantidad || 1),
      precioUnitario: Number(item.PrecioUnitario || item.precioUnitario || 0),
      estado: item.EstadoProducto || item.estadoProducto || 'Sin estado',
      fechaCompra: item.FechaCompra || item.fechaCompra || null
    };
  }

  normalizarImagen(imagen: string): string {
    if (!imagen) {
      return 'assets/img/EasyCommerce.png';
    }

    if (imagen.startsWith('http')) {
      return imagen;
    }

    if (imagen.startsWith('data:image')) {
      return imagen;
    }

    if (imagen.startsWith('assets/')) {
      return imagen;
    }

    if (imagen.startsWith('/')) {
      return `http://localhost:3000${imagen}`;
    }

    return imagen;
  }

  formatearFecha(fecha: string | null): string {
    if (!fecha) {
      return 'Sin fecha';
    }

    return new Date(fecha).toLocaleDateString('es-SV');
  }

  limpiarCamposPassword(): void {
    this.passwordActual = '';
    this.nuevaPassword = '';
    this.confirmarPassword = '';
  }

  limpiarMensajes(): void {
    this.mensaje = '';
    this.mensajeError = '';
  }
}