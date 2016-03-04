import {Injectable} from 'angular2/core';
@Injectable()
export class DatalistIdProvider{
    private count:number=0;

    get provideDatalistId():string{return "datalist_"+this.count++;}
}
