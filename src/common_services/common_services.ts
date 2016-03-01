import {FormServiceFactory} from './../forms/forms';

import {MyLogServiceFactory} from './LogService';
import {ValidationServiceFactory} from './ValidationService';

export function formCommonServicesFactory() {
  var services : Array<FormServiceFactory>=new Array<FormServiceFactory>();
  services.push(new MyLogServiceFactory());
  services.push(new ValidationServiceFactory());
  return services;
}
