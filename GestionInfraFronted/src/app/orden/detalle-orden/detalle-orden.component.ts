import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { Grupo } from 'src/app/models/grupo';
import { Orden } from 'src/app/models/orden';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { GrupoService } from 'src/app/service/grupo-service';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  orden: Orden =
    new Orden(0, '', '', [], 0, 0);
  empleado: Empleado =
    new Empleado(0, '', '', '', '');
  grupo: Grupo =
    new Grupo(0, '', '', []);
  asignado = '';


  dropdownList = [];
  equiposDropdownSettings: IDropdownSettings = {};
  selectedItemsEquipo: number[] = [];


  constructor(
    private ordenService: OrdenService,
    private empleadoService: EmpleadoService,
    private grupoService: GrupoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.ordenService.detail(id).subscribe(
      data => {
        this.orden = data;
        this.selectedItemsEquipo = this.orden.equipos;

        if (this.orden.empleadoId != 0) {
          this.empleadoService.detail(this.orden.empleadoId).subscribe(
            data => {
              this.empleado = data;
              this.asignado = this.empleado.nombreCompleto;
            },
            err => {
              this.toastr.error(err, 'Fail', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.router.navigate(['/listOrden']);
            }
          );
        } else if (this.orden.grupoId != 0) {
          this.grupoService.detail(this.orden.grupoId).subscribe(
            data => {
              this.grupo = data;
              this.asignado = this.grupo.nombre;
            }, err => {
              this.toastr.error(err, 'Fail', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
              this.router.navigate(['/listOrden']);
            }
          );
        }
        this.equiposDropdownSettings = {
          singleSelection: false,
          idField: 'equipoId',
          textField: 'nombre',
          itemsShowLimit: 3,
          allowSearchFilter: false
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
}
