import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProductosListaComponent } from './components/productos-lista/productos-lista';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear';
import { ProductoEditarComponent } from './components/producto-editar/producto-editar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    DashboardComponent,
    ProductosListaComponent,
    ProductoCrearComponent,
    ProductoEditarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  vista: string = 'login';
}