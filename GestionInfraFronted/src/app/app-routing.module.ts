import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEmpleadoComponent } from './empleado/editar-empleado.component';
import { ListaEmpleadoComponent } from './empleado/lista-empleado.component';
import { NuevoEmpleadoComponent } from './empleado/nuevo-empleado.component';
import { ListaGrupoComponent } from './grupo/lista-grupo/lista-grupo.component';
import { NuevoGrupoComponent } from './grupo/nuevo-grupo/nuevo-grupo.component';
import { EditarGrupoComponent } from './grupo/editar-grupo/editar-grupo.component';
import { ListaEquipoComponent } from './equipo/lista-equipo/lista-equipo.component';
import { NuevoEquipoComponent } from './equipo/nuevo-equipo/nuevo-equipo.component';
import { EditarEquipoComponent } from './equipo/editar-equipo/editar-equipo.component';
import { ListaOrdenComponent } from './orden/lista-orden/lista-orden.component';
import { NuevaOrdenComponent } from './orden/nueva-orden/nueva-orden.component';
import { EditarOrdenComponent } from './orden/editar-orden/editar-orden.component';
import { DetalleOrdenComponent } from './orden/detalle-orden/detalle-orden.component';

const routes: Routes = [
  {path: '', component: ListaEmpleadoComponent},
  {path: 'nuevo', component: NuevoEmpleadoComponent},
  {path: 'editar/:id', component: EditarEmpleadoComponent},

  {path: 'listGrupo', component: ListaGrupoComponent},
  {path: 'nuevoGrupo', component: NuevoGrupoComponent},
  {path: 'editarGrupo/:id', component: EditarGrupoComponent},

  {path: 'listEquipo', component: ListaEquipoComponent},
  {path: 'nuevoEquipo', component: NuevoEquipoComponent},
  {path: 'editarEquipo/:id', component: EditarEquipoComponent},
  
  {path: 'listOrden', component: ListaOrdenComponent},
  {path: 'nuevaOrden', component: NuevaOrdenComponent},
  {path: 'editarOrden/:id', component: EditarOrdenComponent},
  {path: 'detalleOrden/:id', component: DetalleOrdenComponent},
  
  
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
