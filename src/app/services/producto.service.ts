import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseURL= "https://backspringbootmongo-zq7ci7xvxq-uc.a.run.app/api/v1/producto/obtenerProductos";

  constructor(private httpClient:HttpClient) { }

  getProduct():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseURL}`);
  }

}
