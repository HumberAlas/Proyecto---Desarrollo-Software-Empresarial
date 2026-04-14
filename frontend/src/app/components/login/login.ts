import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario = '';
  password = '';

  @Input() loginExitoso!: () => void;

  login(): void {
    if (this.usuario && this.password) {
      this.loginExitoso();
    }
  }
}