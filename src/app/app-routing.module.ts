import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCamionesComponent } from './components/admin-camiones/admin-camiones.component';
import { AdminClienteComponent } from './components/admin-cliente/admin-cliente.component';
import { AdminEncomiendasComponent } from './components/admin-encomiendas/admin-encomiendas.component';
import { ControlEncComponent } from './components/control-enc/control-enc.component';
import { GuiaEnvioComponent } from './components/guia-envio/guia-envio.component';
import { ReportesComponent } from './components/reportes/reportes.component';

// Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  

  {path: 'gestion/admin-camiones', component: AdminCamionesComponent},
  {path: 'gestion/admin-cliente', component: AdminClienteComponent},
  {path: 'gestion/admin-encomiendas', component: AdminEncomiendasComponent},
  {path: 'encomiendas/control-enc', component: ControlEncComponent},
  {path: 'encomiendas/guia-envio', component: GuiaEnvioComponent},
  {path: 'reportes', component: ReportesComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
