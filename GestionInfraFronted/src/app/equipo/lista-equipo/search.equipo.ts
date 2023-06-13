import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'equipoFilter'
})
export class SearchEquipo implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: { nombre: string; marca: string; codigoBarras: string;estado: string; ordenId: number }) => {
      let rVal = (val.nombre.toLocaleLowerCase().includes(args)) || 
      (val.marca.toLocaleLowerCase().includes(args))||
      (val.codigoBarras.toLocaleLowerCase().includes(args))||
      (val.estado.toLocaleLowerCase().includes(args))|| 
      (val.ordenId.toString().toLocaleLowerCase().includes(args));
      return rVal;
    })

  }
}