var Keywords:string[] = ["items", "properties", "#","allOf"];

export function toPropertyFragments (path:string):string[] {
  if (path === undefined) {
      return [];
  }
  return path.split('/').filter(function (fragment) {
      return fragment.length > 0;
  })
};
export function toInstancePath (path:string):string {
    return normalize(path);
};

export function normalize (path:string):string {
    return filterNonKeywords(toPropertyFragments(path)).join("/");
};

export function filterNonKeywords (fragments:string[]):string[]  {
    return fragments.filter(function (fragment) {
        return Keywords.indexOf(fragment) === -1 && isNaN(Number(fragment));
    });
};
export function resolveSchema (schema: any, path: string): any  {
  try {
    var fragments = toPropertyFragments(path);
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
export function resolveInstanceFromPath (instance:any, schemaPath:string):any  {
    return resolveInstanceFromFragments(instance,toPropertyFragments(toInstancePath(schemaPath)));
};
export function resolveInstanceFromFragments (instance:any, fragments:string[]):any  {
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
