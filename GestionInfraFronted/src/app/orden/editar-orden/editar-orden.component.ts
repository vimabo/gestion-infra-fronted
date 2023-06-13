import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { Orden } from 'src/app/models/orden';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { EquipoService } from 'src/app/service/equipo.service';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {


  orden: Orden =
    new Orden(0, '', '', [], 0, 0);
  estadosOrdenes: string[] = ["Creada", "En Proceso", "Despachada", "Finalizada"];

  constructor(
    private ordenService: OrdenService,
    private equipoService: EquipoService,
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.ordenService.detail(id).subscribe(
      data => {
        this.orden = data;
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    const orden = new Orden(this.orden.ordenId, this.orden.descripcion,
      this.orden.estado, [], 0, 0);
    this.ordenService.update(id, orden).subscribe(
      data => {
        this.toastr.success('Orden Actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listOrden']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/editarOrden/' + id]);
      }
    );
  }

}
