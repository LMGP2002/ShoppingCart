import { Component } from '@angular/core';
import { Producto } from '../model/producto';
import { Url } from '../model/url';
import { Usuario } from '../model/usuario';
// import { BorrarService } from '../services/borrar.service';
import { ProductoService } from '../services/producto.service';
import { SesionService } from '../services/sesion.service';
import { CarritoProductosService } from '../services/carrito-productos.service';

import Swal from 'sweetalert2'
import { ComprasService } from '../services/compras.service';
import { Pedido } from '../model/pedido';
import { ProductoComprado } from '../model/producto-comprado';
import { CambioestiloscssService } from '../services/cambioestiloscss.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

pedido: Pedido;

products:Producto[]=[];

formatoMoneda:String;

habilitarCompra:boolean=false;

urls:Url[]=[];
usuario: Usuario={id:"2", nombre:"Carlos Miguel", usuario:"lui", contrasena:"123", correo:"luiguerrero@gmail.com",direccion:"Carrera #1",telefono:"3127204406",ciudad:"Tunja",departamento:"Boyacá",descripcion:''};



elementosCarrito:number;

totalPagar:number=0;



  constructor(private carritoProductos:CarritoProductosService, private sesionService:SesionService, private compraProductos: ComprasService, private navigationService:CambioestiloscssService){
    
  }

  ngOnInit():void{
    this.navigationService.setNavigationState('active');
    this.getProduct();
    this.getDatosUser();
  }

  getDatosUser(){

    this.usuario=JSON.parse(this.sesionService.enviarDatosUser());
    
  }



  private getProduct(){
     
    if(this.carritoProductos.getDatosCookie()!=""){
      this.products=JSON.parse(this.carritoProductos.getDatosCookie());

    }
    

    this.products.forEach((e,index)=>{
      let string=e.fotos;

      let objeto=JSON.parse(string);
      objeto.id_producto=e.id
      
      this.urls[index]=objeto;
      
    })

    
    this.elementosCarrito=this.products.length;
    this.valorInicialPagar();
    
  }



  




  increaseNumber(e:Event){
    let id=String ((<HTMLInputElement> e.target).getAttribute("data-id"));
    let precio=parseInt(String((<HTMLInputElement> e.target).getAttribute("data-precio")));
    let stock=parseInt(String((<HTMLInputElement> e.target).getAttribute("data-stock")));
    let inputCantidad=document.getElementById(id);
    let cantidad;

    (<HTMLInputElement> inputCantidad).value=='' ? cantidad=0 : cantidad=parseInt((<HTMLInputElement> inputCantidad).value);

    cantidad++;

    (<HTMLInputElement> inputCantidad).value=''+cantidad;
    this.validarStock(stock,cantidad,id,precio);

  }


  decreaseNumber(e:Event){
    let id=String ((<HTMLInputElement> e.target).getAttribute("data-id"));
    let precio=parseInt(String((<HTMLInputElement> e.target).getAttribute("data-precio")));
    let inputCantidad=document.getElementById(id);

    let cantidad;

    (<HTMLInputElement> inputCantidad).value=='' ? cantidad=0 : cantidad=parseInt((<HTMLInputElement> inputCantidad).value);


    if(cantidad<=0){
      cantidad==0;
    }else cantidad--;

    (<HTMLInputElement> inputCantidad).value=''+cantidad;
    let stock=parseInt(String((<HTMLInputElement> e.target).getAttribute("data-stock")));
    this.validarStock(stock,cantidad,id,precio);
    

  }

  validate(event:KeyboardEvent){
    
    
    const pattern = /[0-9]/;
    let key = event.key;
 

    if (!pattern.test(key)) {
        event.preventDefault();
    }
  }
  
  inputPrecio(event:Event){
    let stock=parseInt(String((<HTMLInputElement> event.target).getAttribute("data-stock")));
    let id=String((<HTMLInputElement> event.target).getAttribute("id"));
    let precio=parseInt(String((<HTMLInputElement> event.target).getAttribute("data-precio")));
    let cantidad;

    (<HTMLInputElement> event.target).value!='' ? cantidad=parseInt((<HTMLInputElement> event.target).value) : cantidad=0;
    this.validarStock(stock,cantidad,id,precio);
  }


  multiplicarCantidad(cantidad:number,precio:number,id:string){

    let cantidadPrecioProducto=document.querySelector("[data-spanvalor='"+id+"']");

    let valorPorProducto=cantidad*precio;

    (<HTMLInputElement> cantidadPrecioProducto).setAttribute("data-cantidadCompra",""+cantidad);

    (<HTMLInputElement> cantidadPrecioProducto).innerHTML=valorPorProducto.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
    
    
    this.calcularTotal();
    
  }


  validarStock(stock:number,cantidad:number,id:string,precio:number){
    let alert=document.querySelector("[data-divalert='"+id+"']");
    if(cantidad>stock){
      (<HTMLInputElement> alert).style.display="block";
      (<HTMLInputElement> alert).innerHTML="Cantidad no disponible";
      
      
      
    } else{
      (<HTMLInputElement> alert).style.display="none";
      this.multiplicarCantidad(cantidad, precio,id);
      
    }

    setTimeout(() => {
      this.validarAlertasCantidad();
    });

    
  }
  validarAlertasCantidad(){
    let alertas=document.querySelectorAll('.alert');
    let contadorAlertas=0;
    alertas.forEach(e=>{
      if(window.getComputedStyle(e).getPropertyValue('display')=="block"){
        contadorAlertas++;
      }
    })
    
    contadorAlertas>0 ? this.habilitarCompra=true:this.habilitarCompra=false;

    
  }

  valorInicialPagar(){
    this.totalPagar=0;

    this.products.forEach(e=>{
      this.totalPagar+=e.precio_unitario;
    })

    this.formatoMoneda = this.totalPagar.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
    

    
  }

  calcularTotal(){
    
    this.totalPagar=0;
    if(this.products.length!=0){

      let spanValor=document.querySelectorAll('[data-cantidadcompra]');
 
      spanValor.forEach((e,i)=>{
      let cantidad:string=String(e.getAttribute("data-cantidadcompra"));
      let precio=this.products[i].precio_unitario;

      this.totalPagar+=parseInt(cantidad)*precio;  
      })
      
    }
    
    this.elementosCarrito=this.products.length;
    this.formatoMoneda = this.totalPagar.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
    
  }


  //Slider
  slider(e:Event){

    let nameSlider=(<HTMLInputElement> e.target).getAttribute("data-slider");
    let marginSlider=String ((<HTMLInputElement> e.target).getAttribute("data-margin"));
    
    let first=(<HTMLElement>document.querySelector("[data-sliderimg='"+nameSlider+"']"));

    
    first.style.marginLeft=marginSlider;

    
    
  }


  //Sweet Alert
  msgAlert=()=>{
    if(this.products.length!=0){
      

      Swal.fire({
        title: 'Comprar productos',
        text: "¿Está seguro que desea realizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compra exitosa',
            'Muchas gracias por adquirir nuestro productos',
            'success'
          )
          setTimeout(() => {
            this.agregarDatosPedido();
          });
        }
      })

    }

    
  }

  
  agregarDatosPedido() {
    
    let spanProductos=document.querySelectorAll('[data-cantidadcompra]');

    let arrayCantidades=Array.from(spanProductos);
    
    
    arrayCantidades=arrayCantidades.filter((e,i)=>{
      
      if(parseInt(e.getAttribute('data-cantidadcompra') ?? '0')==0){
        this.products=this.products.filter(p=>{
          return p.nombre_producto!=e.getAttribute('data-spanvalor');
        });
        return false;
      }else{
        return true;
      }
    });
    
    
    this.pedido = new Pedido();
    
    let fecha = new Date(); 
    
    let dia = fecha.getDate(); 
    let mes = fecha.getMonth() + 1;  
    let mesFormateado=mes.toString().length===2 ? mes:'0'+mes;
    let anio = fecha.getFullYear();
    let fechaFormateada = `${anio}/${mesFormateado}/${dia}`; 
    
    this.pedido.fecha=fechaFormateada;

    this.pedido.id_usuario=parseInt(this.usuario.id);


    let arrayProductosComprados:ProductoComprado[]=[];

    
    
    let cantidadTotalPedido=0;

    this.products.forEach((e,i)=>{
      
      // Crea una instancia de ProductoComprado y asigna los valores
      let cantidadComprada=parseInt(arrayCantidades[i].getAttribute('data-cantidadcompra') ?? '0');
      let producto: ProductoComprado = new ProductoComprado();
      producto.codigo_producto = parseInt(e.id);
      producto.valor = e.precio_unitario*cantidadComprada;
      producto.cantidad_comprada = cantidadComprada;
      producto.cantidad_min=e.cantidad_min;
      producto.id_proveedor=e.id_proveedor;

      
      arrayProductosComprados.push(producto);

      cantidadTotalPedido+=producto.valor;
      
      
    });
    
    this.pedido.productos_comprados=arrayProductosComprados;
    this.pedido.valor_total=cantidadTotalPedido;

    


    // Enviar los datos a la base de datos

    this.compraProductos.guardarPedido(this.pedido)
    .subscribe({
      next: (response) =>{console.log('Pedido guardado exitosamente:', response)},
      error: (response) => {console.error('Error al guardar el pedido:', response)}
    })
    


     //Limpiar el carrito

     this.carritoProductos.vaciarCarrito();
     this.products=[];
     this.calcularTotal();
  
  }

 

  eliminarElementoCarrito(event:any){

    
    
    let array = this.products.filter((elemento) => {         
      return elemento.id != event.target.getAttribute('data-idProducto');
    });


    this.products=array;

    let arrayUrls = this.urls.filter((url) => {         
      return url.id_producto != event.target.getAttribute('data-idProducto');
    });

    
    this.urls=arrayUrls;

    this.carritoProductos.carritoProducto=this.products;
    
    this.carritoProductos.guardarDatos();

    setTimeout(() => {
      this.calcularTotal();
    });

    
    
  }
}
