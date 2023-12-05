import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';

import { AdminClienteComponent } from './components/admin-cliente/admin-cliente.component';
import { AdminCamionesComponent } from './components/admin-camiones/admin-camiones.component';
import { AdminEncomiendasComponent } from './components/admin-encomiendas/admin-encomiendas.component';

import { GuiaEnvioComponent } from './components/guia-envio/guia-envio.component';
import { ControlEncComponent } from './components/control-enc/control-enc.component';
import { ReportesComponent } from './components/reportes/reportes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent,
    ProgressBarComponent,

    AdminClienteComponent,
    AdminCamionesComponent,
    AdminEncomiendasComponent,

    GuiaEnvioComponent,
    ControlEncComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
