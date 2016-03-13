export class PlaceUtil {
  static getPlaceName(place:any){
    if (place.names!=undefined && place.names.length>0){
      return place.names[0].value;
    }
    return JSON.stringify(place);
  }
}
