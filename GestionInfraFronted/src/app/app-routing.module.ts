import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEmpleadoComponent } from './empleado/editar-empleado.component';
import { ListaEmpleadoComponent } from './empleado/lista-empleado.component';
import { NuevoEmpleadoComponent } from './empleado/nuevo-empleado.component';
import { ListaGrupoComponent } from './grupo/lista-grupo/lista-grupo.component';
import { NuevoGrupoComponent } from './grupo/nuevo-grupo/nuevo-grupo.component';
import { EditarGrupoComponent } from './grupo/editar-grupo/editar-grupo.component';

const routes: Routes = [
  {path: '', component: ListaEmpleadoComponent},
  {path: 'nuevo', component: NuevoEmpleadoComponent},
  {path: 'editar/:id', component: EditarEmpleadoComponent},

  {path: 'listGrupo', component: ListaGrupoComponent},
  {path: 'nuevoGrupo', component: NuevoGrupoComponent},
  {path: 'editarGrupo/:id', component: EditarGrupoComponent},
  
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
