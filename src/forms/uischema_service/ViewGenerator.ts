
export class ViewGenerator{
    static generate(schema:any,prefixPath = "#/properties/"):ILayout{
        //get or create a sub schema -> ui schema providers
        let subUiSchema:ILayout={type:'VerticalLayout',elements:[]};
        if(schema.allOf!=undefined){
          schema.allOf.forEach((element,index) =>{subUiSchema.elements.push(this.generate(element,"allOf/"+index+"/properties/"));});
          return subUiSchema;
        }
        Object.keys(schema.properties).forEach(key => {
            let control:IControlObject={type:"Control",label:key,scope:{$ref:prefixPath+key}};
            subUiSchema.elements.push(control);
        });
        return subUiSchema;
    }
}
