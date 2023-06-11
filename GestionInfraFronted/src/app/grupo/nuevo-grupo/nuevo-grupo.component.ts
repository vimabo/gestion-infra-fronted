import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { Grupo } from 'src/app/models/grupo';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { GrupoService } from 'src/app/service/grupo-service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.css']
})
export class NuevoGrupoComponent implements OnInit {

  id: number = 0;
  nombre = '';
  direccion = '';
  fechaRegistro = '';
  fechaModificacion = '';

  empleados: Empleado[] = [];


  dropdownList = [];
  dropdownSettings:IDropdownSettings={};
  selectedItems=[];
  


  constructor(private grupoService: GrupoService, private empleadoService: EmpleadoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.empleadoService.lista().subscribe(
      data => {
        this.empleados = data;
      },
      err => {
        console.log(err);
      }
    );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'empleadoId',
      textField: 'nombreCompleto',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onCreate(): void {

    const grupo = new Grupo(this.id, this.nombre, this.direccion, this.selectedItems);
    this.grupoService.save(grupo).subscribe(
      data => {
        this.toastr.success('Grupo Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listGrupo']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/nuevoGrupo']);
      }
    );
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
