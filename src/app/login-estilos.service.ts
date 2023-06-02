import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class LoginEstilosService {
 
  constructor() { }
 
  public loadScript() {
    let node = document.createElement('script');
    node.src = 'assets/js/login.js';
    node.id="estilosLogin"
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  public removeScript() {
    let node = document.getElementById("estilosLogin");
    if(node) {
        node.remove();
    } 
}
}
 