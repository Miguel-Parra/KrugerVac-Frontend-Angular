import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
