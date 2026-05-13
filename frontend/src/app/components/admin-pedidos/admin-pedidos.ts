import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductoPedido {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Pedido {
  id: string;
  fecha: string;
  estado: 'Pendiente' | 'En proceso' | 'Entregado' | 'Cancelado';
  total: number;
  productos: ProductoPedido[];
}

interface PedidosUsuario {
  usuarioId: string;
  nombreUsuario: string;
  correo: string;
  pedidos: Pedido[];
}

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.css'
})
export class AdminPedidosComponent {
  @Input() cambiarVista!: (vista: string) => void;
  @Input() cerrarSesion!: () => void;

  usuarioExpandido: string | null = null;

  pedidosPorUsuario: PedidosUsuario[] = [
    {
      usuarioId: 'USR001',
      nombreUsuario: 'Karla Patricia Miranda Orellana',
      correo: 'karla@easycommerce.com',
      pedidos: [
        {
          id: 'PED-001',
          fecha: '2026-05-01',
          estado: 'Pendiente',
          total: 820.50,
          productos: [
            {
              nombre: 'Laptop Lenovo IdeaPad',
              cantidad: 1,
              precio: 750.00
            },
            {
              nombre: 'Mouse inalámbrico',
              cantidad: 2,
              precio: 35.25
            }
          ]
        },
        {
          id: 'PED-002',
          fecha: '2026-05-04',
          estado: 'Entregado',
          total: 45.99,
          productos: [
            {
              nombre: 'Teclado mecánico',
              cantidad: 1,
              precio: 45.99
            }
          ]
        }
      ]
    },
    {
      usuarioId: 'USR002',
      nombreUsuario: 'Felix Mauricio Palacios Tejada',
      correo: 'felix@easycommerce.com',
      pedidos: [
        {
          id: 'PED-003',
          fecha: '2026-05-06',
          estado: 'En proceso',
          total: 120.00,
          productos: [
            {
              nombre: 'Monitor 24 pulgadas',
              cantidad: 1,
              precio: 120.00
            }
          ]
        }
      ]
    },
    {
      usuarioId: 'USR003',
      nombreUsuario: 'Kenia Guadalupe Miranda Orellana',
      correo: 'kenia@easycommerce.com',
      pedidos: [
        {
          id: 'PED-004',
          fecha: '2026-05-08',
          estado: 'Cancelado',
          total: 25.50,
          productos: [
            {
              nombre: 'Mouse gamer',
              cantidad: 1,
              precio: 25.50
            }
          ]
        }
      ]
    }
  ];

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

  alternarUsuario(usuarioId: string): void {
    this.usuarioExpandido = this.usuarioExpandido === usuarioId ? null : usuarioId;
  }

  marcarComoEntregado(pedido: Pedido): void {
    pedido.estado = 'Entregado';
  }

  cancelarPedido(pedido: Pedido): void {
    const confirmar = confirm(`¿Desea cancelar el pedido ${pedido.id}?`);

    if (!confirmar) return;

    pedido.estado = 'Cancelado';
  }

  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Entregado':
        return 'bg-success';
      case 'Pendiente':
        return 'bg-warning text-dark';
      case 'En proceso':
        return 'bg-primary';
      case 'Cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  obtenerTotalPedidos(usuario: PedidosUsuario): number {
    return usuario.pedidos.reduce((total, pedido) => total + pedido.total, 0);
  }
}