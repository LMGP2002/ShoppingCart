import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CarritoProductosService {

  carritoProducto:Producto[]=[];

  constructor(private carritoProductosCookie:CookieService) { }

 
  guardarDatos(){
    this.carritoProductosCookie.set("carritoProductos",JSON.stringify(this.carritoProducto));
  }

  
  getDatosCookie() {
    return this.carritoProductosCookie.get("carritoProductos");
  }

  vaciarCarrito(){
    
    this.carritoProductosCookie.set("carritoProductos","");
    this.carritoProducto=[];
    
  }
}
