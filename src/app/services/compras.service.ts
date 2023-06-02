import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private servicioUrl = 'http://macula.serveo.net/api/v1/transacciones/procesoCompra'; 
  

  constructor(private httpClient: HttpClient) { }

  guardarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.put<Pedido>(this.servicioUrl, pedido);


  }
}
