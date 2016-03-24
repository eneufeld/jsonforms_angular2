import {UISchemaParameter} from '../../forms/forms';
export class RefUriHelper {
    public static getRefUri(parentUISchemaParameter:UISchemaParameter,controlPath:string,schemaRefs:any):string{
        let searchKeys:Array<string>=[];
        let indexOfProperties=controlPath.indexOf("properties");
        searchKeys.push(controlPath.substr(indexOfProperties));
        let lastIndexOfAllOf=controlPath.lastIndexOf("allOf");
        searchKeys.push(controlPath.substr(lastIndexOfAllOf));
        searchKeys.push(parentUISchemaParameter.refUri+controlPath);

        let foundKeys=Object.keys(schemaRefs).filter(key=>{return searchKeys.some(searchKey=>{return key.indexOf(searchKey)!=-1;})});
        if(foundKeys==null || foundKeys.length==0 )
            return undefined;
        let resolvedRefs=foundKeys.map(key=>{
            return {ref:schemaRefs[key],prio:(key.indexOf(searchKeys[0])!=-1?1:0) +(key.indexOf(searchKeys[1])!=-1?2:0)+(key.indexOf(searchKeys[2])!=-1?4:0)}
        });
        let resolvedRef=resolvedRefs.reduce((prev,cur)=>{if(prev.prio>cur.prio)return prev; return cur});
        if(resolvedRef!=null)
            return resolvedRef.ref.uri;
    }
}
