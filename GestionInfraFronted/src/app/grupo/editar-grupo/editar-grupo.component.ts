import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { Grupo } from 'src/app/models/grupo';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { GrupoService } from 'src/app/service/grupo-service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent implements OnInit {
  grupo: Grupo =
    new Grupo(0, '', '', []);
    empleados: Empleado[] = [];

    dropdownList = [];
    dropdownSettings:IDropdownSettings={};
    selectedItems : number[] = [];

  constructor(
    private grupoService: GrupoService,
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.grupoService.detail(id).subscribe(
      data => {
        this.grupo = data;
        this.empleadoService.lista().subscribe(
          data => {
            this.empleados = data;
          },
          err => {
            console.log(err);
          }
        );
        this.selectedItems = this.grupo.empleados;
        
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'empleadoId',
          textField: 'nombreCompleto',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

 onUpdate(): void {
   const id = this.activatedRoute.snapshot.params.id;
   const grupo = new Grupo(this.grupo.grupoId, this.grupo.nombre, this.grupo.direccion, this.selectedItems);
    this.grupoService.update(id, grupo).subscribe(
      data => {
        this.toastr.success('Grupo Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listGrupo']);
      },
      err => {
          this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/editarGrupo/'+id]);
      }
    );
  }

}
