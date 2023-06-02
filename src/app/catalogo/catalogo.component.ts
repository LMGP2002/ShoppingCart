import { Component } from '@angular/core';
import { Producto } from '../model/producto';
import { CarritoProductosService } from '../services/carrito-productos.service';
import { Url } from '../model/url';
import { CambioestiloscssService } from '../services/cambioestiloscss.service';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2'
import { RespaldoProductosService } from '../services/respaldo-productos.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  
  constructor(private carritoProductos:CarritoProductosService, private navigationService:CambioestiloscssService, private productoService:ProductoService,
    private respaldoService:RespaldoProductosService){
    this.carritoProductos.carritoProducto=this.carritoProducto;
  }
  
  ngOnInit():void{
    this.navigationService.setNavigationState('active');
    this.getProduct();
  }
  
  ngAfterViewInit(): void {
    // this.verificarCarrito();
  }
  
  

  urls:Url[]=[];

  products:Producto[]=[];

  carritoProducto:Producto[]=[];

  //Sweet Alert
  msgAlert=()=>{
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos, inténtalo más tarde',
      text: 'Estamos experimentando fallas técnicas para acceder a la base de datos',
    })
    
  }


  getProduct(){

    this.productoService.getProduct().subscribe({
      next: (dato) => {
        this.products = dato;
        
        
        this.products.forEach((e,index)=>{
          let string=e.fotos;
          
          let objeto=JSON.parse(string);
          
          objeto.id_producto=e.id
          
          
          
          this.urls[index]=objeto.fotoPrincipal;
          
          
          
        })
        
  
        setTimeout(() => {
          this.verificarCarrito();
        });
        this.respaldoService.respaldarProductos(this.products);
        
      },error: () => {
        let stringObjeto=this.respaldoService.enviarRespaldo();
        
        if(stringObjeto){
          this.products=JSON.parse(stringObjeto);
          this.products.forEach((e,index)=>{
            let string=e.fotos;
            
            let objeto=JSON.parse(string);
            
            objeto.id_producto=e.id
            
            
            
            this.urls[index]=objeto.fotoPrincipal;
            
            
          })
          setTimeout(() => {
            this.verificarCarrito();
          });

        }else this.msgAlert();

      }
    });
    

  }


  
  verificarCarrito(){
    let botones=document.querySelectorAll('.btnCarrito');
    
    if(this.carritoProductos.getDatosCookie()!=""){
      this.carritoProducto=JSON.parse(this.carritoProductos.getDatosCookie());

    }
    

    Array.from(botones).forEach((e)=>{

      for(let i=0;i<this.carritoProducto.length;i++){
        if(e.getAttribute('data-carritoProducto')==this.carritoProducto[i].id){
          
          
          (<HTMLElement>e).innerHTML="Quitar del carrito";
          (<HTMLElement>e).classList.add('add-product-carrito');
          
        }

      };


    });
  }


  llenarCarrito(event:any){
    
    
    (<HTMLElement> event.target).classList.toggle('add-product-carrito');
    
    let idProducto= (<HTMLElement> event.target).getAttribute('data-carritoProducto');

    if ((<HTMLElement> event.target).textContent=="Añadir al carrito") {
        (<HTMLElement> event.target).innerHTML="Quitar del carrito";
        this.carritoProducto.push(this.products[Number(idProducto)-1]);
        this.carritoProductos.carritoProducto=this.carritoProducto;
        this.carritoProductos.guardarDatos();
      
        
      } else {
        
        (<HTMLElement> event.target).innerHTML="Añadir al carrito";
        let array = this.carritoProducto.filter((elemento) => {         
          return elemento.id !== this.products[Number(idProducto)-1].id;
        });
        
        this.carritoProducto=array;
        this.carritoProductos.carritoProducto=this.carritoProducto;
        
        this.carritoProductos.guardarDatos();
        
        

    }

    
    
    
  }





}
