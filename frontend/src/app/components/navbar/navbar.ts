import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  @Input() cambiarVista!: (vista: string) => void;
  @Input() cerrarSesion!: () => void;
  @Input() logueado!: boolean;

  get nombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') || 'Usuario';
  }

  irADashboard(event: Event): void {
    event.preventDefault();
    this.cambiarVista('dashboard');
  }

  irAProductos(event: Event): void {
    event.preventDefault();
    this.cambiarVista('lista');
  }

  irAServicios(event: Event): void {
  event.preventDefault();
  this.cambiarVista('servicios');
}

irANosotros(event: Event): void {
  event.preventDefault();
  this.cambiarVista('nosotros');
}

irAPromociones(event: Event): void {
  event.preventDefault();
  this.cambiarVista('promociones');
}

irACarrito(event: Event): void {
  event.preventDefault();
  this.cambiarVista('carrito');
}

irAFavoritos(event: Event): void {
  event.preventDefault();
  this.cambiarVista('favoritos');
}

irAConfiguracion(event: Event): void {
  event.preventDefault();
  this.cambiarVista('configuracion');
}

  logout(event: Event): void {
    event.preventDefault();
    this.cerrarSesion();
  }
}