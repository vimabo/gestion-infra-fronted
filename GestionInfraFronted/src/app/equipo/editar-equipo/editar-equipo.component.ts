import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {

  estadosEquipos: string[] = ["Buenas Condiciones", "Regular", "Equipo Ocupado", "Se Debe Reparar"];
  equipo: Equipo =
    new Equipo(0, '', '', '', '');

  constructor(
    private equipoService: EquipoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.equipoService.detail(id).subscribe(
      data => {
        this.equipo = data;
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/listEquipo']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.equipoService.update(id, this.equipo).subscribe(
      data => {
        this.toastr.success('Equipo Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listEquipo']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/editarEquipo/' + id]);
      }
    );
  }

}
