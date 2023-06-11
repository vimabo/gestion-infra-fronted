import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleadoComponent } from './empleado/lista-empleado.component';
import { NuevoEmpleadoComponent } from './empleado/nuevo-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DateInputConverter } from './date-input-converter.directive';
import { DatePipe } from '@angular/common';




// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/errorInterceptor ';
import { NuevoGrupoComponent } from './grupo/nuevo-grupo/nuevo-grupo.component';
import { EditarGrupoComponent } from './grupo/editar-grupo/editar-grupo.component';
import { ListaGrupoComponent } from './grupo/lista-grupo/lista-grupo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadoComponent,
    NuevoEmpleadoComponent,
    EditarEmpleadoComponent,
    DateInputConverter,
    NuevoGrupoComponent,
    EditarGrupoComponent,
    ListaGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }