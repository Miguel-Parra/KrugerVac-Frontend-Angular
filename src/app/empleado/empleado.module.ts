import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VacunaComponent } from './pages/vacuna/vacuna.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    VacunaComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmpleadoModule { }
