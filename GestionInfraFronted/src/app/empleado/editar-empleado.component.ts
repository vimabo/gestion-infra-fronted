import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  tipoDocumentos:string[]=["CC","CE","TI","NIT"];
  empleado: Empleado =
    new Empleado(0, '', '', '','');

  constructor(
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.empleadoService.detail(id).subscribe(
      data => {
        this.empleado = data;
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
    this.empleadoService.update(id, this.empleado).subscribe(
      data => {
        this.toastr.success('Empleado Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
          this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/editar/'+id]);
      }
    );
  }

}
