import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {Router} from 'angular2/router';
import {FormsTester,NOT_FITTING} from '../../../src/forms/forms';
import {AbstractControlRenderer,ControlRendererTester} from '../../../src/common_renderer/controls/AbstractControlRenderer';
import {PathUtil} from '../../../src/common_renderer/PathUtil';

@Component({
    selector: 'ReferenceControlRenderer',
    template: `
        <div class="forms_control">
            <label class="forms_referenceLabel forms_controlLabel">{{label}}</label>
            <button class="forms_controlReference" (click)="navigateTo()">Open</button>
            <div *ngFor="#error of getErrors(_uiSchema.validation)" class="forms_controlValidation">{{error|json}}</div>
        </div>
    `
    ,
    styles: [``],
    directives:[],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReferenceControlRenderer extends AbstractControlRenderer{
    constructor( @Inject('uiSchema') _uiSchema:IControlObject, @Inject('data') _data:any, @Inject('dataSchema') _dataSchema:any,private _router: Router) {
        super(_uiSchema,_data);
    }
    private navigateTo(){
      let id:string=this._modelValue[this.fragment];
      this._router.navigate([this._uiSchema['navigateTo'], { id: id.substr(1) }]);
    }

}
export var ReferenceControlRendererTester: FormsTester = function (element:IUISchemaElement, dataSchema:any, dataObject:any ){
    if(element.type!='Control')
        return NOT_FITTING;
    if(!element.hasOwnProperty('navigateTo'))
      return NOT_FITTING;
    return 10;
}
