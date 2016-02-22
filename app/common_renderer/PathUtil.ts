function toPropertyFragments (path:string):string[] {
  if (path === undefined) {
      return [];
  }
  return path.split('/').filter(function (fragment) {
      return fragment.length > 0;
  })
};
export function resolveSchema (schema: any, path: string): any  {
  try {
    var fragments = toPropertyFragments(path);
    return fragments.reduce(function (subSchema, fragment) {
          if (fragment == "#") {
              return subSchema
          } else if (subSchema instanceof Array) {
              return subSchema.map(function (item) {
                  return item[fragment];
              });
          }
          return subSchema[fragment];
      }, schema);
    } catch(err) {
        return undefined;
    }
};
