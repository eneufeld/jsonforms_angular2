import {Pipe} from 'angular2/core';

@Pipe({name: 'personDeathDate'})
export class PersonDeathDatePipe {
  transform(person:any) : any {
    if (person.facts!=undefined && person.facts.length>0){
      for (var fact of person.facts) {
        if (fact.type == "http://gedcomx.org/Death"){
          return fact.date.original;
        }
      }
    }
    return "No death date defined";
  }
}
