<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css'
})
<<<<<<< HEAD
export class AdminUsuariosComponent implements OnInit {
  @Input() cambiarVista!: (vista: string) => void;
  @Input() cerrarSesion!: () => void;
  @Input() vistaActual = '';

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];

  busqueda = '';
  mensaje = '';
  mensajeError = '';

  modalAbierto = false;
  modoEdicion = false;

  usuarioSeleccionado = {
=======
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
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    id: '',
    nombre: '',
    correo: '',
    direccion: '',
    contacto: '',
<<<<<<< HEAD
    rol: ''
  };

  nuevaPassword = '';
  confirmarPassword = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (respuesta: any) => {
        this.usuarios = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];

        this.aplicarBusqueda();
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudieron cargar los usuarios.';
      }
    });
  }

  aplicarBusqueda(): void {
    const texto = this.busqueda.trim().toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const nombre = this.obtenerNombre(usuario).toLowerCase();
      const correo = this.obtenerCorreo(usuario).toLowerCase();
      const contacto = this.obtenerContacto(usuario).toLowerCase();

      return (
        !texto ||
        nombre.includes(texto) ||
        correo.includes(texto) ||
        contacto.includes(texto)
      );
    });
  }

  abrirFormulario(usuario?: any): void {
    this.limpiarMensajes();
    this.nuevaPassword = '';
    this.confirmarPassword = '';

    if (usuario) {
      this.modoEdicion = true;

      this.usuarioSeleccionado = {
        id: this.obtenerId(usuario),
        nombre: this.obtenerNombre(usuario),
        correo: this.obtenerCorreo(usuario),
        direccion: this.obtenerDireccion(usuario),
        contacto: this.obtenerContacto(usuario),
        rol: this.obtenerRol(usuario)
      };
    } else {
      this.modoEdicion = false;

      this.usuarioSeleccionado = {
        id: '',
        nombre: '',
        correo: '',
        direccion: '',
        contacto: '',
        rol: 'Cliente'
      };
    }

    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.nuevaPassword = '';
    this.confirmarPassword = '';
  }

  guardarUsuario(): void {
console.log('Botón guardar usuario presionado');
  console.log('Usuario seleccionado:', this.usuarioSeleccionado);

    this.limpiarMensajes();

    if (!this.usuarioSeleccionado.nombre.trim()) {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }

    if (!this.usuarioSeleccionado.correo.trim()) {
      this.mensajeError = 'El correo es obligatorio.';
      return;
    }

    if (this.nuevaPassword || this.confirmarPassword) {
      if (this.nuevaPassword !== this.confirmarPassword) {
        this.mensajeError = 'Las contraseñas no coinciden.';
        return;
      }

      if (this.nuevaPassword.length < 6) {
        this.mensajeError = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }
    }

    const data: any = {
      UsuarioID: this.usuarioSeleccionado.id,
      nombre: this.usuarioSeleccionado.nombre.trim(),
      correo: this.usuarioSeleccionado.correo.trim(),
      direccion: this.usuarioSeleccionado.direccion.trim(),
      contacto: this.usuarioSeleccionado.contacto.trim(),
      rol: this.usuarioSeleccionado.rol
    };

    if (this.nuevaPassword) {
      data.nuevaPassword = this.nuevaPassword;
    }

    this.usuarioService.actualizarUsuarioAdmin(data).subscribe({
      next: () => {
        this.mensaje = 'Usuario actualizado correctamente.';
        this.cerrarModal();
        this.cargarUsuarios();

        setTimeout(() => {
          this.mensaje = '';
        }, 2500);
      },
      error: (error: any) => {
        this.mensajeError = error.error?.mensaje || 'No se pudo guardar el usuario.';
      }
    });
  }

=======
    rol: 'Cliente',
    password: '',
    confirmarPassword: ''
  };

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
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

<<<<<<< HEAD
=======
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

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
  limpiarMensajes(): void {
    this.mensaje = '';
    this.mensajeError = '';
  }
<<<<<<< HEAD

  obtenerId(usuario: any): string {
    return String(usuario?._id || usuario?.UsuarioID || usuario?.usuarioId || usuario?.id || '');
  }

  obtenerNombre(usuario: any): string {
    return usuario?.nombre || usuario?.Nombre || 'Sin nombre';
  }

  obtenerCorreo(usuario: any): string {
    return usuario?.correo || usuario?.Correo || 'Sin correo';
  }

  obtenerDireccion(usuario: any): string {
    return usuario?.direccion || usuario?.Direccion || '';
  }

  obtenerContacto(usuario: any): string {
    return usuario?.contacto || usuario?.Contacto || '';
  }

  obtenerRol(usuario: any): string {
    return usuario?.rol || usuario?.Rol || 'Cliente';
  }
=======
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
}