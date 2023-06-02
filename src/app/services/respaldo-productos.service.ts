import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RespaldoProductosService {

  constructor(private cookies:CookieService) { }

  respaldarProductos(products:Producto[]){
    let objetoString = JSON.stringify(products);
    localStorage.setItem('respaldo', objetoString);
    
  }

  enviarRespaldo(){
    return localStorage.getItem('respaldo');
  }
}
