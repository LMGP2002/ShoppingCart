import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SesionService } from './services/sesion.service';
import { CambioestiloscssService } from './services/cambioestiloscss.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  activeNavigation = false;

  constructor(private sesionService:SesionService, private navigationService: CambioestiloscssService, private cdr: ChangeDetectorRef){
    
  }

  ngOnInit():void{
    this.navigationService.getNavigationState().subscribe(state => {
      this.activeNavigation = (state === 'active');
      this.cdr.detectChanges();
    });
  }

  

  

  title = 'ShoppingCart';

  existeSesion(){
    let token=this.sesionService.existeSesion();
    
    if(token=="SESION"){
      return true;
    }else{
      return false;
    }
  }

  cerrarSesion(){
    this.sesionService.cerrarSesion();
  }

  hiddenItemsMenu(){
    let token=this.sesionService.existeSesion();
    if(token=="SESION"){
      return false;
    }else{
      return true;
    }

  }

  validarUsuario(){
    let bandera=false;
    if(this.sesionService.enviarDatosUser()){
      let usuario =JSON.parse(this.sesionService.enviarDatosUser());
      let nomUsuario=usuario.nombre;
      if(nomUsuario!=="admin"){
        bandera= false;
      }else{
        bandera= true;
      }
    }
    return bandera;
     
  }

}
