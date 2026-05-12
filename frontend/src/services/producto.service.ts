import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/ObtenerTodos`);
  }

  obtenerProductoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/ObtenerporId/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/productos/RegistrarConImagenes`,
      producto,
      { headers: this.getHeaders() }
    );
  }

  actualizarProducto(producto: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/productos/ActualizarProducto`,
      producto,
      { headers: this.getHeaders() }
    );
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/productos/EliminarporId/${id}`,
      { headers: this.getHeaders() }
    );
  }
  
}