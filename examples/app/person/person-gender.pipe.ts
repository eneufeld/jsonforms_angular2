import {Pipe} from 'angular2/core';

@Pipe({name: 'personGender'})
export class PersonGenderPipe {
  transform(person:any) : any {
    if (person.gender!=undefined){
      return person.gender.type;
    }
    return "http://gedcomx.org/Unknown";
  }
}
