import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {


  
  private baseURL= "http://macula.serveo.net/pedido/traerPedidos";
  private alternativeURL = "http://curso.serveo.net/pedido/traerPedidos";
  pedidos:any[]=[]

  constructor(private httpClient:HttpClient) { }

  getProduct():Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseURL).pipe(
      catchError(error => {
        console.log('Error en la solicitud a baseURL:', error);
        console.log('Realizando solicitud a alternativeURL...');
  
        return this.httpClient.get<any[]>(this.alternativeURL);
      })
    );
  }



  getPedidos(){
    return this.pedidos;
  }
}
