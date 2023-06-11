import { FormControl } from "@angular/forms";


export class Grupo {
    grupoId: number;
    nombre: string;
    direccion: string;
    fechaRegistro: string | undefined;
    fechaModificacion: string | undefined;
    empleados: Array<number>;

    constructor(grupoId: number, nombre: string,
        direccion: string, empleados:Array<number>) {
        this.grupoId = grupoId;
        this.nombre = nombre;
        this.direccion = direccion;
        this.empleados = empleados;
    }
}
