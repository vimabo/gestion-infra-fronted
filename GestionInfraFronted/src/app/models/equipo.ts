import { FormControl } from "@angular/forms";


export class Equipo {
    equipoId: number;
    nombre: string;
    marca: string;
    codigoBarras: string;
    estado: string;
    fechaRegistro: string | undefined;
    ordenId: number | undefined;


    constructor(equipoId: number, nombre: string,
        marca: string, codigoBarras: string, estado: string) {
        this.equipoId = equipoId;
        this.nombre = nombre;
        this.marca = marca;
        this.codigoBarras = codigoBarras;
        this.estado = estado;
    }
}
