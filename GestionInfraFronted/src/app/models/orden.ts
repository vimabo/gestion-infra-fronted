import { FormControl } from "@angular/forms";


export class Orden {
    ordenId: number;
    descripcion: string;
    estado: string;
    fechaRegistro: string | undefined;
    fechaModificacion: string | undefined;
    equipos: Array<number>;
    empleadoId: number;
    grupoId: number;

    constructor(ordenId: number, descripcion: string,
        estado: string, equipos:Array<number>,
         empleadoId: number,grupoId: number
        ) {
        this.ordenId = ordenId;
        this.descripcion = descripcion;
        this.estado = estado;
        this.equipos = equipos;
        this.empleadoId = empleadoId;
        this.grupoId = grupoId;
    }
}
