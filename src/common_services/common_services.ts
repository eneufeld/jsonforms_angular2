import {FormsService} from './../forms/forms';

import {MyLogService} from './LogService';
import {ValidationService} from './ValidationService';

export function formCommonServicesFactory() {
  var services : Array<FormsService>=new Array<FormsService>();
  services.push(new MyLogService());
  services.push(new ValidationService());
  return services;
}
