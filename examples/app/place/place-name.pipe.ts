import {Pipe} from 'angular2/core';
import {PlaceUtil} from './place-util';

@Pipe({name: 'placeName'})
export class PlaceNamePipe {
  transform(place:any) : any {
    return PlaceUtil.getPlaceName(place);
  }
}
