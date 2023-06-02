import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { SesionService } from "../services/sesion.service";

export const canActivate:CanActivateFn=(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot
)=>{
    const authService=inject(SesionService);
    const router=inject(Router);
    
    let autorizacion=authService.existeSesion();

    if(autorizacion){
        return true
    }else{
        router.navigate(['/']);
        return false
    }

};