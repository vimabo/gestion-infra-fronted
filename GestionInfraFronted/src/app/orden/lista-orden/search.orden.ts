import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ordenFilter'
})
export class SearchOrden implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: { descripcion: string; estado: string}) => {
      let rVal = (val.descripcion.toLocaleLowerCase().includes(args)) || 
      (val.estado.toLocaleLowerCase().includes(args))
      return rVal;
    })

  }
}