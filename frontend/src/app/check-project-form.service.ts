import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckProjectFormService {

  
  constructor() { }
  
  checkName(name: String) {
    if(name == '')
      return false;
    else
      return true
  }

  checkDescription(description: String) {
    if(description == '')
      return false;
    else
      return true
  }

  checkClient(type: Object) {
    if(type == '')
      return false;
    else
      return true
  }
  
  checkExperience(experience: Number | String) {
    if(experience == '')
      return false;
    else
      return true
  }
}
