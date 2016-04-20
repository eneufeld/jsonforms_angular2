export declare class PathUtil {
    private static Keywords;
    static toPropertyFragments: (path: string) => string[];
    static toInstancePath: (path: string) => string;
    static normalize: (path: string) => string;
    static filterNonKeywords: (fragments: string[]) => string[];
    static resolveSchema: (schema: any, path: string) => any;
    static resolveInstanceFromPath: (instance: any, schemaPath: string, createDummy?: boolean) => any;
    static resolveInstanceFromFragments: (instance: any, fragments: string[], createDummy?: boolean) => any;
    /**
     * Beautifies by performing the following steps (if applicable)
     * 1. split on uppercase letters
     * 2. transform uppercase letters to lowercase
     * 3. transform first letter uppercase
     */
    static beautify: (text: string) => string;
}
