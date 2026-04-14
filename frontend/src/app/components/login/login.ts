import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  password = '';
  mensaje = '';

  iniciarSesion(): void {
    if (!this.correo || !this.password) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }

    this.mensaje = 'Inicio de sesión exitoso.';
  }
}

