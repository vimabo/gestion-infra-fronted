import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/service/orden.service';

@Component({
  selector: 'app-lista-orden',
  templateUrl: './lista-orden.component.html',
  styleUrls: ['./lista-orden.component.css']
})
export class ListaOrdenComponent implements OnInit {

  ordenes: Orden[] = [];
  filtro: '' | undefined;
  
  constructor(private ordenService: OrdenService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenService.lista().subscribe(
      data => {
        this.ordenes = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
