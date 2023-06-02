
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  token:string="";
  user:Usuario;
  mensajeError:string;
  

  private baseURL= "https://backspringbootmongo-zq7ci7xvxq-uc.a.run.app/api/v1/usuario/inicioSesion";

  constructor(private httpClient:HttpClient, private router:Router, private cookies:CookieService) { }

  ngOnInit():void{
    
  }
  

  sendUser(usuario:Login){
    this.httpClient.post<Usuario>(`${this.baseURL}`,usuario).subscribe({
      next: (dato) => {

        
        if(dato.hasOwnProperty('descripcion')){
          this.mensajeError=dato.descripcion;
          this.cookies.set("mensajeError",this.mensajeError);
        }

        if('id' in dato){
          this.token="SESION";
          this.user=dato;
          this.cookies.set("token",""+this.token);
          let objetoString:string=JSON.stringify(this.user);
          this.cookies.set("user",objetoString);
          
          
                    
          this.router.navigate(['/catalog']);
        }else{
          this.token="NOTSESION";
          this.cookies.set("token",""+this.token);
        }           
        
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }

  enviarMensajeError(){
    return this.cookies.get("mensajeError");
  }

  existeSesion(){
    
    return this.cookies.get("token");
  }


  cerrarSesion(){
    this.token="";
    this.cookies.set("token",""+this.token);
    this.router.navigate(['/']);
  }

  enviarDatosUser(){
    return this.cookies.get("user");
  }
}




