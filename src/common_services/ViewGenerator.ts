
export class ViewGenerator{
    static generate(schema:any):ILayout{
        //get or create a sub schema -> ui schema providers
        let subUiSchema:ILayout={type:'VerticalLayout',elements:[]};
        Object.keys(schema.properties).forEach(key => {
            let control:IControlObject={type:"Control",label:key,scope:{$ref:"#/properties/"+key}};
            subUiSchema.elements.push(control);
        });
        return subUiSchema;
    }
}
