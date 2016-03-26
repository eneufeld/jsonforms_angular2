import {Router} from 'angular2/router';
import {DataProviderService} from '../DataProviderService';

export abstract class ListComponent {
  protected values: any[];
  constructor(protected _dataProviderService: DataProviderService, protected _router: Router) { }

  protected addValue(){
    let newId=this._dataProviderService[this.getCreateMethodName()].call(this._dataProviderService);
    this.goToDetailById(newId);
  }
  protected getValues() {
    this._dataProviderService[this.getValuesMethodName()].call(this._dataProviderService).then(places => this.values = places);
  }
  protected goToDetail(person:any) {
      this.goToDetailById(person.id);
  }
  protected goToDetailById(id:string){
      this._router.navigate([this.getDetailName(), { id: id }]);
  }
  protected abstract getCreateMethodName():string;
  protected abstract getValuesMethodName():string;
  protected abstract getDetailName():string;
  protected abstract getName(value:any):string;
  protected abstract getHeader():string;
  protected abstract getAddValue():string;
  protected getAdditionalClassesOnInfo(value:any):string|Array<string>{return ""};
  protected getAdditionalInfos(value:any):Array<AdditionalInfo>{return []};
  protected getAdditionalButtons(value:any):Array<AdditionalButton>{return []};
}
export interface AdditionalInfo{
  class:string;
  value:string;
}
export interface AdditionalButton{
  click:()=>any;
  value:string;
}
