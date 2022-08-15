import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guard/validar-token.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: "administrador",
    loadChildren: () => import('./administrador/administrador.module')
    .then(m => m.AdministradorModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
    
  },
  {
    path: "empleado",
    loadChildren: () => import('./empleado/empleado.module')
    .then(m => m.EmpleadoModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  { path: "**", redirectTo: 'auth' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
