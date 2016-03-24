import {Injectable, Inject, OpaqueToken} from 'angular2/core';
import {
  isPresent,
  isType,
  Type,
  CONST_EXPR
} from 'angular2/src/facade/lang';
import {reflector} from 'angular2/src/core/reflection/reflection';
import {UISchemaProviderConfig,UISchemaProvider,UISchemaProviderTester,UISchemaParameter} from './uischema_config_impl';
import {ViewGenerator} from './ViewGenerator';

@Injectable()
export class UISchemaProviderService {
  private uiSchemaProviders : Array<UISchemaProvider>=[];
  constructor(@Inject('FormPrimaryComponent') private _rootComponent: Type) {
    this.configFromComponent();
  }
  /**
   * Reads the annotations of a component and configures the registry based on them
   */
  configFromComponent(): void {
    if (!isType(this._rootComponent)) {
      return;
    }
    var annotations = reflector.annotations(this._rootComponent);
    if (isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];

        if (annotation instanceof UISchemaProviderConfig) {
          let uischemaCfgs: UISchemaProvider[] = annotation.configs;

          uischemaCfgs.forEach(config => this.uiSchemaProviders.push(config));
        }
      }
    }
  }

  register(uischemaElement:IUISchemaElement,tester:UISchemaProviderTester):void {
    this.uiSchemaProviders.push({uischemaElement:uischemaElement,tester:tester});
  }
  getBestComponent(dataSchema:any,uiSchemaParameter:UISchemaParameter):IUISchemaElement {
    var bestUISchema:IUISchemaElement;
    var highestSpecificity:number=-1;
    for (var uiSchemaProvider of this.uiSchemaProviders) {
      var currentSpecificity:number=uiSchemaProvider.tester(dataSchema,uiSchemaParameter);
      if (currentSpecificity>highestSpecificity){
        highestSpecificity=currentSpecificity;
        bestUISchema=uiSchemaProvider.uischemaElement;
      }
    }
    if(bestUISchema!=null)
        return JSON.parse(JSON.stringify(bestUISchema));
    return ViewGenerator.generate(dataSchema);
  }
}
