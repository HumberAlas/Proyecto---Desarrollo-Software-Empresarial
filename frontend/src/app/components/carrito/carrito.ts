import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ItemCarrito {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent {
  codigoDescuento = '';
  descuento = 0;
  envio = 5;

  mostrarModalCompra = false;
  mostrarModalContacto = false;
  mostrarFormularioTarjeta = false;

  metodoPago = 'contraentrega';

  direccionUsuario = 'Chalatenango, El Salvador';
  camposFaltantes: string[] = [];

  carrito: ItemCarrito[] = [
    {
      id: 1,
      nombre: 'Teclado mecánico',
      descripcion: 'Teclado RGB para computadora.',
      precio: 45.99,
      cantidad: 1,
      imagen: 'assets/img/EasyCommerce.png'
    },
    {
      id: 2,
      nombre: 'Mouse gamer',
      descripcion: 'Mouse ergonómico de alta precisión.',
      precio: 25.5,
      cantidad: 2,
      imagen: 'assets/img/EasyCommerceCarrito.png'
    }
  ];

  get subtotal(): number {
    return this.carrito.reduce((total, item) => {
      return total + item.precio * item.cantidad;
    }, 0);
  }

  get total(): number {
    return Math.max(this.subtotal - this.descuento + this.envio, 0);
  }

  aumentarCantidad(item: ItemCarrito): void {
    item.cantidad++;
  }

  disminuirCantidad(item: ItemCarrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  eliminarProducto(id: number): void {
    this.carrito = this.carrito.filter(item => item.id !== id);
  }

  aplicarCodigo(): void {
    const codigo = this.codigoDescuento.trim().toUpperCase();

    if (codigo === 'EASY10') {
      this.descuento = this.subtotal * 0.1;
      return;
    }

    if (codigo === 'ENVIO') {
      this.envio = 0;
      return;
    }

    this.descuento = 0;
    this.envio = 5;
    alert('Código de descuento no válido.');
  }

  finalizarCompra(): void {
    this.camposFaltantes = [];

    if (!this.direccionUsuario) {
      this.camposFaltantes.push('Dirección');
    }

    if (this.camposFaltantes.length > 0) {
      this.mostrarModalContacto = true;
      return;
    }

    this.mostrarModalCompra = true;
  }

  cambiarMetodoPago(): void {
    this.mostrarFormularioTarjeta = this.metodoPago === 'tarjeta';
  }

  confirmarCompra(): void {
    alert('Compra confirmada correctamente.');
    this.carrito = [];
    this.mostrarModalCompra = false;
  }

  cerrarModalCompra(): void {
    this.mostrarModalCompra = false;
  }

  cerrarModalContacto(): void {
    this.mostrarModalContacto = false;
  }
}