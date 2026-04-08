import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Sistema de Inventario con Control de Stock</h1>
    <p>Frontend Angular funcionando correctamente.</p>
  `
})
class AppComponent {}

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));