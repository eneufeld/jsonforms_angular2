export class PathUtil{

private static Keywords:string[] = ["items", "properties", "#","allOf","anyOf","oneOf"];

static toPropertyFragments=function (path:string):string[] {
  if (path === undefined) {
      return [];
  }
  return path.split('/').filter(function (fragment) {
      return fragment.length > 0;
  })
};
static toInstancePath=function  (path:string):string {
    return PathUtil.normalize(path);
};

static normalize=function  (path:string):string {
    return PathUtil.filterNonKeywords(PathUtil.toPropertyFragments(path)).join("/");
};

static filterNonKeywords=function  (fragments:string[]):string[]  {
    return fragments.filter(function (fragment) {
        return PathUtil.Keywords.indexOf(fragment) === -1 && isNaN(Number(fragment));
    });
};
static resolveSchema=function  (schema: any, path: string): any  {
  try {
    var fragments = PathUtil.toPropertyFragments(path);
    return fragments.reduce(function (subSchema, fragment) {
          if (fragment == "#") {
              return subSchema;
          } else if (subSchema instanceof Array) {
              return subSchema[fragment];
          }
          return subSchema[fragment];
      }, schema);
    } catch(err) {
        return undefined;
    }
};
static resolveInstanceFromPath=function  (instance:any, schemaPath:string):any  {
    return PathUtil.resolveInstanceFromFragments(instance,PathUtil.toPropertyFragments(PathUtil.toInstancePath(schemaPath)));
};
static resolveInstanceFromFragments=function  (instance:any, fragments:string[]):any  {
    return fragments.reduce(function (currObj, fragment) {
        if (currObj instanceof Array) {
            return currObj.map(function (item) {
                return item[fragment];
            });
        }
        if(!currObj.hasOwnProperty(fragment)){
            currObj[fragment]={};
        }
        return currObj[fragment];
    }, instance);
};

/**
 * Beautifies by performing the following steps (if applicable)
 * 1. split on uppercase letters
 * 2. transform uppercase letters to lowercase
 * 3. transform first letter uppercase
 */
static beautify = (text: string): string => {
    if(text && text.length > 0){
        let textArray = text.split(/(?=[A-Z])/).map((x)=>{return x.toLowerCase()});
        //textArray[0] = textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1);
        textArray=textArray.map(value=>{return value.charAt(0).toUpperCase() + value.slice(1)});
        return textArray.join(' ');
    }
    return text;
};

}
