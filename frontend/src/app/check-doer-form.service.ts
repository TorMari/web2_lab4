import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckDoerFormService {

  constructor() { }
  
  checkName(name: String) {
    if(name == '')
      return false;
    else
      return true
  }

  checkDoer(doer_num: Number|String) {
    if(doer_num == '')
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
