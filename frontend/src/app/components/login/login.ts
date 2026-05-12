import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  @Input() loginExitoso!: () => void;

  modo: 'login' | 'registro' = 'login';

  login = {
    correo: '',
    password: ''
  };

  registro = {
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  };

  errorLogin = '';
  errorRegister = '';
  errorPasswordMatch = false;
  mensajeRegistro = '';

  constructor(private authService: AuthService) {}

  mostrarRegistro(event: Event): void {
    event.preventDefault();
    this.modo = 'registro';
    this.limpiarMensajes();
  }

  mostrarLogin(event: Event): void {
    event.preventDefault();
    this.modo = 'login';
    this.limpiarMensajes();
  }

  iniciarSesion(): void {
    this.limpiarMensajes();

    if (!this.login.correo || !this.login.password) {
      this.errorLogin = 'Debe ingresar correo y contraseña.';
      return;
    }

    this.authService.login(this.login.correo, this.login.password).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuarioId', respuesta.usuarioId || respuesta.idUsuario || respuesta.usuario?.id || '');
        localStorage.setItem('nombreUsuario', respuesta.nombre || respuesta.usuario?.nombre || '');
        localStorage.setItem('rol', respuesta.rol || respuesta.usuario?.rol || '');

        localStorage.setItem('tipoLogin', 'admin');

        this.loginExitoso();
      },
      error: () => {
        this.errorLogin = 'Credenciales incorrectas.';
      }
    });
  }

  registrarUsuario(): void {
    this.limpiarMensajes();

    if (this.registro.password !== this.registro.confirmPassword) {
      this.errorPasswordMatch = true;
      return;
    }

    const nuevoUsuario = {
      nombre: this.registro.nombre,
      correo: this.registro.correo,
      password: this.registro.password,
      rol: 'Cliente'
    };

    this.authService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.mensajeRegistro = 'Usuario registrado correctamente. Ahora puede iniciar sesión.';

        this.registro = {
          nombre: '',
          correo: '',
          password: '',
          confirmPassword: ''
        };

        setTimeout(() => {
          this.modo = 'login';
          this.mensajeRegistro = '';
        }, 2000);
      },
      error: (error) => {
        this.errorRegister = error.error?.mensaje || 'Error al registrar usuario.';
      }
    });
  }

  limpiarMensajes(): void {
    this.errorLogin = '';
    this.errorRegister = '';
    this.errorPasswordMatch = false;
    this.mensajeRegistro = '';
  }
}