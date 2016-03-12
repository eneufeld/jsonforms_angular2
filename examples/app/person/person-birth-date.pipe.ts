import {Pipe} from 'angular2/core';

@Pipe({name: 'personBirthDate'})
export class PersonBirthDatePipe {
  transform(person:any) : any {
    if (person.facts!=undefined && person.facts.length>0){
      for (var fact of person.facts) {
        if (fact.type == "http://gedcomx.org/Birth"){
          return fact.date.original;
        }
      }
    }
    return "No birth date defined";
  }
}
