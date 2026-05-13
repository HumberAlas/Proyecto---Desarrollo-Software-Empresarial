import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Favorito {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent {
  favoritos: Favorito[] = [
    {
      id: 1,
      nombre: 'Laptop Lenovo',
      descripcion: 'Laptop ideal para estudio, trabajo y uso diario.',
      precio: 750,
      imagen: 'assets/img/EasyCommerce.png'
    },
    {
      id: 2,
      nombre: 'Teclado mecánico',
      descripcion: 'Teclado mecánico con iluminación RGB.',
      precio: 45.99,
      imagen: 'assets/img/EasyCommerceCarrito.png'
    },
    {
      id: 3,
      nombre: 'Mouse gamer',
      descripcion: 'Mouse ergonómico de alta precisión.',
      precio: 25.5,
      imagen: 'assets/img/EasyCommerce.png'
    }
  ];

  eliminarFavorito(id: number): void {
    this.favoritos = this.favoritos.filter(producto => producto.id !== id);
  }

  agregarAlCarrito(producto: Favorito): void {
    alert(`Producto agregado al carrito: ${producto.nombre}`);
  }
}