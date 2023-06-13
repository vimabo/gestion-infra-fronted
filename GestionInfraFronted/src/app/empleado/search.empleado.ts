import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'empleadosFilter'
})
export class SearchEmpleado implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: { nombreCompleto: string; tipoDocumento: string; numeroDocumento: string;email: string;estado: string }) => {
      let rVal = (val.nombreCompleto.toLocaleLowerCase().includes(args)) || 
      (val.tipoDocumento.toLocaleLowerCase().includes(args))||
      (val.numeroDocumento.toLocaleLowerCase().includes(args))||
      (val.email.toLocaleLowerCase().includes(args))|| 
      (val.estado.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}