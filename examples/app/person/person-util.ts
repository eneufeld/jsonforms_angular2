export class PersonUtil {
  static getPersonName(person:any){
    if (person.names!=undefined && person.names.length>0){
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
}
