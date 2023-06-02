import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { RouterLinkActive, RouterModule, Routes } from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { canActivate } from './model/carrito-guardian';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ReportepedidosComponent } from './reportepedidos/reportepedidos.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponent},
  {path:'cart', component:CartComponent, canActivate:[canActivate]},
  {path:'catalog', component:CatalogoComponent, canActivate:[canActivate]},
  {path:'report', component:ReportepedidosComponent, canActivate:[canActivate]},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CatalogoComponent,
    ReportepedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    RouterLinkActive,
    FormsModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
