import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../service/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Empleado } from '../models/empleado';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})

export class NuevoEmpleadoComponent implements OnInit {

  id: number = 0;
  nombreCompleto = '';
  tipoDocumento = '';
  numeroDocumento = '';
  email = '';

  tipoDocumentos:string[]=["CC","CE","TI","NIT"];

  constructor(private empleadoService: EmpleadoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const empleado = new Empleado(this.id, this.nombreCompleto, this.tipoDocumento,
        this.numeroDocumento, this.email);


    this.empleadoService.save(empleado).subscribe(
      data => {
        this.toastr.success('Empleado Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/nuevo']);
      }
    );
  }
}
