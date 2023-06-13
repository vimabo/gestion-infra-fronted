import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/service/grupo-service';

@Component({
  selector: 'app-lista-grupo',
  templateUrl: './lista-grupo.component.html',
  styleUrls: ['./lista-grupo.component.css']
})
export class ListaGrupoComponent implements OnInit {


  grupos: Grupo[] = [];
  filtro: '' | undefined;
  
  constructor(private grupoService: GrupoService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.cargarGrupos();
  }

  cargarGrupos(): void {
    this.grupoService.lista().subscribe(
      data => {
        this.grupos = data;
      },
      err => {
        console.log(err);
      }
    );
  }


  borrar(id: number) {
    if (confirm("¿Seguro que deseas eliminar el registro?")) {
      this.grupoService.delete(id).subscribe(
        data => {
          this.toastr.success('Grupo Eliminado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarGrupos();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }
  }
}
