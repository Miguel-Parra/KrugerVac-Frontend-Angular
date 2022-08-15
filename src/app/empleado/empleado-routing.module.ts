import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { VacunaComponent } from './pages/vacuna/vacuna.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "principal", component: PrincipalComponent },
      { path: "agregarVacuna", component: VacunaComponent },
      { path: "**", redirectTo: "principal" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
