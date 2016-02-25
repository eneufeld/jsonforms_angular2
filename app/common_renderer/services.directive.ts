import {Directive, Inject,DoCheck,KeyValueDiffers} from 'angular2/core';
import PathUtil = require('./PathUtil');
import {FormsService,ChangeNotification} from '../forms/forms';

@Directive({
    selector: '[ngModel]'
})
export class ServicesDirective implements DoCheck {
    differ: any;
    constructor(@Inject('dataSchema') private _dataSchema:any, @Inject('uiSchema') private _uiSchema:IControlObject, @Inject('data') private _data:any, differs: KeyValueDiffers, @Inject('FormServices') private _services: Array<FormsService>) {
        this.differ = differs.find({}).create(null);
    }

    ngDoCheck() {
        var changes = this.differ.diff(this._data);

        if (changes) {
            changes.forEachAddedItem(r => {
                if(this._uiSchema.scope.$ref.indexOf(r.key)!=-1){
                    this._services.forEach(service =>service.onAdd(new ChangeNotification(this._dataSchema,this._uiSchema, this._data, r.previousValue, r.currentValue)));
                }
            });
            changes.forEachRemovedItem(r => {
                if(this._uiSchema.scope.$ref.indexOf(r.key)!=-1){
                    this._services.forEach(service =>service.onRemove(new ChangeNotification(this._dataSchema, this._uiSchema, this._data, r.previousValue, r.currentValue)));
                }
            });
            changes.forEachChangedItem(r => {
                if(this._uiSchema.scope.$ref.indexOf(r.key)!=-1){
                    this._services.forEach(service =>service.onChange(new ChangeNotification(this._dataSchema, this._uiSchema, this._data, r.previousValue, r.currentValue)));
                }
            });
        }
    }
}
