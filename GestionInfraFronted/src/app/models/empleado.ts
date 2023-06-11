import { FormControl } from "@angular/forms";


export class Empleado {
    empleadoId:number;
    nombreCompleto: string;
    tipoDocumento: string;
    numeroDocumento: string;
    email: string;
    estado: string | undefined;



    constructor(empleadoId: number, nombreCompleto: string, 
        tipoDocumento: string, numeroDocumento: string, email: string) {
        this.empleadoId = empleadoId;    
        this.nombreCompleto = nombreCompleto;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.email = email;
    }
}
