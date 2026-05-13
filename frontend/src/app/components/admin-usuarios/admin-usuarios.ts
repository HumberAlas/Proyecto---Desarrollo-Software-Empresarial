import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UsuarioAdmin {
  id: string;
  nombre: string;
  correo: string;
  direccion: string;
  contacto: string;
  rol: string;
}

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css'
})
export class AdminUsuariosComponent {
  @Input() cambiarVista!: (vista: string) => void;
  @Input() cerrarSesion!: () => void;

  mostrarModal = false;
  modoEdicion = false;
  mensajeError = '';
  mensaje = '';

  usuarios: UsuarioAdmin[] = [
    {
      id: 'USR001',
      nombre: 'Karla Patricia Miranda Orellana',
      correo: 'karla@easycommerce.com',
      direccion: 'Chalatenango, El Salvador',
      contacto: '7000-0001',
      rol: 'Cliente'
    },
    {
      id: 'USR002',
      nombre: 'Felix Mauricio Palacios Tejada',
      correo: 'felix@easycommerce.com',
      direccion: 'San Salvador, El Salvador',
      contacto: '7000-0002',
      rol: 'Administrador'
    },
    {
      id: 'USR003',
      nombre: 'Kenia Guadalupe Miranda Orellana',
      correo: 'kenia@easycommerce.com',
      direccion: 'Santa Ana, El Salvador',
      contacto: '7000-0003',
      rol: 'Cliente'
    }
  ];

  usuarioForm = {
    id: '',
    nombre: '',
    correo: '',
    direccion: '',
    contacto: '',
    rol: 'Cliente',
    password: '',
    confirmarPassword: ''
  };

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

  abrirFormulario(): void {
    this.modoEdicion = false;
    this.limpiarMensajes();

    this.usuarioForm = {
      id: '',
      nombre: '',
      correo: '',
      direccion: '',
      contacto: '',
      rol: 'Cliente',
      password: '',
      confirmarPassword: ''
    };

    this.mostrarModal = true;
  }

  editarUsuario(usuario: UsuarioAdmin): void {
    this.modoEdicion = true;
    this.limpiarMensajes();

    this.usuarioForm = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      direccion: usuario.direccion,
      contacto: usuario.contacto,
      rol: usuario.rol,
      password: '',
      confirmarPassword: ''
    };

    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.limpiarMensajes();
  }

  guardarUsuario(): void {
    this.limpiarMensajes();

    if (!this.usuarioForm.nombre.trim()) {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }

    if (!this.usuarioForm.correo.trim()) {
      this.mensajeError = 'El correo es obligatorio.';
      return;
    }

    if (!this.modoEdicion && !this.usuarioForm.password) {
      this.mensajeError = 'La contraseña es obligatoria para nuevos usuarios.';
      return;
    }

    if (this.usuarioForm.password || this.usuarioForm.confirmarPassword) {
      if (this.usuarioForm.password !== this.usuarioForm.confirmarPassword) {
        this.mensajeError = 'Las contraseñas no coinciden.';
        return;
      }
    }

    if (this.modoEdicion) {
      const index = this.usuarios.findIndex(usuario => usuario.id === this.usuarioForm.id);

      if (index !== -1) {
        this.usuarios[index] = {
          id: this.usuarioForm.id,
          nombre: this.usuarioForm.nombre,
          correo: this.usuarioForm.correo,
          direccion: this.usuarioForm.direccion,
          contacto: this.usuarioForm.contacto,
          rol: this.usuarioForm.rol
        };
      }

      this.mensaje = 'Usuario actualizado correctamente.';
      this.mostrarModal = false;
      return;
    }

    const nuevoUsuario: UsuarioAdmin = {
      id: `USR${String(this.usuarios.length + 1).padStart(3, '0')}`,
      nombre: this.usuarioForm.nombre,
      correo: this.usuarioForm.correo,
      direccion: this.usuarioForm.direccion,
      contacto: this.usuarioForm.contacto,
      rol: this.usuarioForm.rol
    };

    this.usuarios.push(nuevoUsuario);

    this.mensaje = 'Usuario creado correctamente.';
    this.mostrarModal = false;
  }

  eliminarUsuario(usuario: UsuarioAdmin): void {
    const confirmar = confirm(`¿Desea eliminar el usuario "${usuario.nombre}"?`);

    if (!confirmar) return;

    this.usuarios = this.usuarios.filter(item => item.id !== usuario.id);
    this.mensaje = 'Usuario eliminado correctamente.';
  }

  limpiarMensajes(): void {
    this.mensaje = '';
    this.mensajeError = '';
  }
}