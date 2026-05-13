import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css'
})
export class ConfiguracionComponent {
  @Input() cerrarSesion!: () => void;

  seccionActiva: 'cuenta' | 'pedidos' | 'historial' | 'pagos' = 'cuenta';

  usuario = {
    correo: localStorage.getItem('correo') || 'usuario@easycommerce.com',
    nombre: localStorage.getItem('nombreUsuario') || 'Usuario',
    direccion: 'Chalatenango, El Salvador',
    contacto: '7000-0000'
  };

  cambioPasswordVisible = false;

  password = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  mensaje = '';
  mensajeError = '';
  mostrarModalEliminar = false;

  pedidos = [
    {
      id: 'PED-001',
      fecha: '2025-05-01',
      estado: 'En proceso',
      total: 120.50
    },
    {
      id: 'PED-002',
      fecha: '2025-05-05',
      estado: 'Entregado',
      total: 89.99
    }
  ];

  historial = [
    {
      id: 'HIS-001',
      fecha: '2025-04-20',
      descripcion: 'Compra de periféricos',
      total: 45.99
    },
    {
      id: 'HIS-002',
      fecha: '2025-04-28',
      descripcion: 'Compra de accesorios',
      total: 25.50
    }
  ];

  seleccionarSeccion(seccion: 'cuenta' | 'pedidos' | 'historial' | 'pagos', event: Event): void {
    event.preventDefault();
    this.seccionActiva = seccion;
    this.limpiarMensajes();
  }

  mostrarCambioPassword(): void {
    this.cambioPasswordVisible = !this.cambioPasswordVisible;
  }

  guardarCambios(): void {
    this.limpiarMensajes();

    if (!this.usuario.nombre || !this.usuario.correo) {
      this.mensajeError = 'Nombre y correo son obligatorios.';
      return;
    }

    if (this.cambioPasswordVisible) {
      if (!this.password.actual || !this.password.nueva || !this.password.confirmar) {
        this.mensajeError = 'Complete todos los campos de contraseña.';
        return;
      }

      if (this.password.nueva !== this.password.confirmar) {
        this.mensajeError = 'La nueva contraseña y la confirmación no coinciden.';
        return;
      }
    }

    localStorage.setItem('nombreUsuario', this.usuario.nombre);
    localStorage.setItem('correo', this.usuario.correo);

    this.mensaje = 'Cambios guardados correctamente.';

    this.password = {
      actual: '',
      nueva: '',
      confirmar: ''
    };

    this.cambioPasswordVisible = false;
  }

  abrirModalEliminar(): void {
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminarCuenta(): void {
    localStorage.clear();
    this.mostrarModalEliminar = false;

    if (this.cerrarSesion) {
      this.cerrarSesion();
    }
  }

  cerrarSesionDesdeConfiguracion(event: Event): void {
    event.preventDefault();

    if (this.cerrarSesion) {
      this.cerrarSesion();
    }
  }

  limpiarMensajes(): void {
    this.mensaje = '';
    this.mensajeError = '';
  }
}