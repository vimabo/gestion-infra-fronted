import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { Equipo } from 'src/app/models/equipo';
import { Grupo } from 'src/app/models/grupo';
import { Orden } from 'src/app/models/orden';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { EquipoService } from 'src/app/service/equipo.service';
import { GrupoService } from 'src/app/service/grupo-service';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-nueva-orden',
  templateUrl: './nueva-orden.component.html',
  styleUrls: ['./nueva-orden.component.css']
})
export class NuevaOrdenComponent implements OnInit {
  id: number = 0;
  descripcion = '';
  estado = '';
  fechaRegistro = '';
  fechaModificacion = '';
  empleadoId: number = 0;
  grupoId: number = 0;

  estadosOrdenes: string[] = ["Creada", "En Proceso", "Despachada", "Finalizada"];

  equipos: Equipo[] = [];
  empleados: Empleado[] = [];
  grupos: Grupo[] = [];


  dropdownList = [];
  equiposDropdownSettings: IDropdownSettings = {};
  selectedItemsEquipo = [];
  comboEmpleado = false;
  comboGrupo = false;
  selectedEmpleado: number = 0;
  selectedGrupo: number = 0;
  asignado = '';



  constructor(private ordenService: OrdenService,
    private grupoService: GrupoService,
    private empleadoService: EmpleadoService,
    private equipoService: EquipoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.equipoService.disponibles().subscribe(
      data => {
        this.equipos = data;
      },
      err => {
        console.log(err);
      }
    );
    this.equiposDropdownSettings = {
      singleSelection: false,
      idField: 'equipoId',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.empleadoService.lista().subscribe(
      data => {
        this.empleados = data;
      },
      err => {
        console.log(err);
      }
    );
    this.grupoService.lista().subscribe(
      data => {
        this.grupos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCreate(): void {

    const orden = new Orden(this.id, this.descripcion, 
      this.estado, this.selectedItemsEquipo, this.selectedEmpleado, this.selectedGrupo);
    this.ordenService.save(orden).subscribe(
      data => {
        this.toastr.success('Orden Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listOrden']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/nuevaOrden']);
      }
    );
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onChange(deviceValue: any) {
    if (this.asignado == '1') {
      this.comboEmpleado = true;
      this.comboGrupo = false;
    } else {
      this.comboGrupo = true;
      this.comboEmpleado = false;
    }
  }
}
