import { Component, OnInit } from '@angular/core';
import { CambioestiloscssService } from '../services/cambioestiloscss.service';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../model/pedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportepedidos',
  templateUrl: './reportepedidos.component.html',
  styleUrls: ['./reportepedidos.component.css']
})
export class ReportepedidosComponent implements OnInit{

  constructor(private navigationService:CambioestiloscssService, private pedidosService:PedidosService){


  }
  ngOnInit(): void {
    this.getPedidos();
    this.navigationService.setNavigationState('active');
  }
  
  getPedidos(){

    Swal.fire({
      title: 'Cargando los pedidos...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    
    this.pedidosService.getProduct().subscribe(dato=>{
      
      
      
      this.pedidos = dato;
      


      this.pedidosFiltrados = this.pedidos;
       // Cerrar el "loader" de SweetAlert2
      Swal.close();
    })


  }
  filtroFecha: string;
  pedidos: any[] = [];
  pedidosFiltrados: any[]; 

  filtrarPorFecha() {
    if (this.filtroFecha) {
      this.pedidosFiltrados = this.pedidos.filter(item => {
        
        let fechaItem = item.fecha; 
        let filtro = this.filtroFecha; 
  
        return fechaItem.startsWith(filtro);
      });
    } else {
      this.pedidosFiltrados = this.pedidos;
    }
  }

  // Código modal

  showModal = false;
  selectedPedido: any;


   openPedidoModal(pedido: any) {
    this.selectedPedido = pedido;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPedido = null;
  }

}
