import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProductosListaComponent } from './components/productos-lista/productos-lista';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear';
import { ProductoEditarComponent } from './components/producto-editar/producto-editar';
import { NavbarComponent } from './components/navbar/navbar';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    DashboardComponent,
    ProductosListaComponent,
    ProductoCrearComponent,
    ProductoEditarComponent,
    NavbarComponent
  ],
  template: `
  <app-navbar
    [cambiarVista]="cambiarVista.bind(this)"
    [logueado]="logueado"
    [cerrarSesion]="cerrarSesion.bind(this)">
  </app-navbar>

  <div *ngIf="mensajeLogin" class="alert alert-success text-center m-2">
    {{ mensajeLogin }}
  </div>

  <div [ngSwitch]="vista">
    <app-login
      *ngSwitchCase="'login'"
      [loginExitoso]="iniciarSesion.bind(this)">
    </app-login>

    <app-dashboard *ngSwitchCase="'dashboard'"></app-dashboard>

    <app-productos-lista
      *ngSwitchCase="'lista'"
      [editarProducto]="irAEditarProducto.bind(this)">
    </app-productos-lista>

    <app-producto-crear *ngSwitchCase="'crear'"></app-producto-crear>

    <app-producto-editar
      *ngSwitchCase="'editar'"
      [productoSeleccionado]="productoSeleccionado"
      [volverALista]="volverALista.bind(this)">
    </app-producto-editar>
  </div>
`
})
export class AppComponent {
  vista = 'dashboard';
  productoSeleccionado: Producto | null = null;

  logueado = false;
  mensajeLogin = '';

  cambiarVista(vista: string): void {
    this.vista = vista;
  }

  iniciarSesion(): void {
    this.logueado = true;
    this.vista = 'dashboard';
    this.mensajeLogin = '✔ Inicio de sesión correcto';

    setTimeout(() => {
      this.mensajeLogin = '';
    }, 3000);
  }

  cerrarSesion(): void {
    this.logueado = false;
    this.vista = 'login';
  }

  irAEditarProducto(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
    this.vista = 'editar';
  }

  volverALista(): void {
    this.vista = 'lista';
  }
} 

