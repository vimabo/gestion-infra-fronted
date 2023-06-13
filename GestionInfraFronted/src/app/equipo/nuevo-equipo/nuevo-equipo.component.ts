import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-nuevo-equipo',
  templateUrl: './nuevo-equipo.component.html',
  styleUrls: ['./nuevo-equipo.component.css']
})
export class NuevoEquipoComponent implements OnInit {

  equipoId: number = 0;
  nombre = '';
  marca = '';
  codigoBarras = '';
  estado = '';

  estadosEquipos: string[] = ["Buenas Condiciones", "Regular", "Equipo Ocupado", "Se Debe Reparar"];


  constructor(private equipoService: EquipoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const equipo = new Equipo(this.equipoId, this.nombre, this.marca,
      this.codigoBarras, this.estado);


    this.equipoService.save(equipo).subscribe(
      data => {
        this.toastr.success('Equipo Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listEquipo']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/nuevoEquipo']);
      }
    );
  }
}
