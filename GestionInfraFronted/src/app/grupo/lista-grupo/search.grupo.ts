import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'grupoFilter'
})
export class SearchGrupo implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: { direccion: string; nombre: string}) => {
      let rVal = (val.nombre.toLocaleLowerCase().includes(args)) || 
      (val.direccion.toLocaleLowerCase().includes(args))||
      (val.nombre.toLocaleLowerCase().includes(args))
      return rVal;
    })

  }
}