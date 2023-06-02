import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginEstilosService } from '../login-estilos.service';
import { Login } from '../model/login';
import { SesionService } from '../services/sesion.service';
import { CambioestiloscssService } from '../services/cambioestiloscss.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  token:String;
  usuario:Login=new Login();
  mensajeError:string;

  constructor(private loginEstilos: LoginEstilosService, private sesionService:SesionService, private navigationService:CambioestiloscssService, private cdr: ChangeDetectorRef) {
    this.loginEstilos.removeScript();
    this.loginEstilos.loadScript();
    
  }

  ngOnInit():void{
    this.navigationService.setNavigationState('false');
    
    
  }

  
  
  sendUser(form:NgForm){
    
    this.usuario.nombreUsuario=this.usuario.nombreUsuario.trim();
    
    this.sesionService.sendUser(this.usuario);
    let existeSesion=this.existeSesion();
    if(existeSesion!=false){
      form.reset();
    }

    
    
    
  }

  obtenerMensajeError(){
    this.mensajeError=this.sesionService.enviarMensajeError();
    
  }

  
  existeSesion(){
    
    this.token=this.sesionService.existeSesion();
    this.obtenerMensajeError();
    
    if(this.token=="NOTSESION"){
      return true;
    }else{
      return false;
    }
    
    
  }


  onSubmit(form:NgForm){

    if(!form.invalid) this.sendUser(form);

  }

  
}
