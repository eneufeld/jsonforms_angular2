export class PersonUtil {
  static getPersonName(person:any){
    if (person.names!=undefined && person.names.length>0 && person.names[0].nameForms!=undefined && person.names[0].nameForms.length>0){
      var nameForm=person.names[0].nameForms[0];
      if (nameForm.fullText!==undefined){
        return nameForm.fullText;
      }
      if (nameForm.parts!=undefined && nameForm.parts.length>0) {
        var result:string;
        for (var namePart of nameForm.parts) {
          if (result==undefined){
            result="";
          }
          else {
            result=result.concat(" ");
          }
          result=result.concat(namePart.value);
        }
        return result;
      }
    }
    return JSON.stringify(person);
  }
  private static isMale(person:any){
    if(person.gender==undefined)
      return false;
    return person.gender.type=="http://gedcomx.org/Male";
  }
  private static isFemale(person:any){
    if(person.gender==undefined)
      return false;
    return person.gender.type=="http://gedcomx.org/Female";
  }
  private static isUnknown(person:any){
    if(person.gender==undefined)
      return true;
    return person.gender.type=="http://gedcomx.org/Unknown";
  }
  static getGenderClass(person:any):string{
    if(PersonUtil.isMale(person))
      return "male";
    if(PersonUtil.isFemale(person))
      return "female";
    if(PersonUtil.isUnknown(person))
      return "unknown";
    return "unknown";
  }
  static getBirthDate(person:any):string{
    if (person.facts!=undefined && person.facts.length>0){
      for (var fact of person.facts) {
        if (fact.type == "http://gedcomx.org/Birth"){
          return fact.date.original;
        }
      }
    }
    return "No birth date defined";
  }
  static getDeathDate(person:any):string{
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
