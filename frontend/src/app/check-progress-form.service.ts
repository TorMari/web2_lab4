import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckProgressFormService {

  
  constructor() { }
  
  checkDoer(doer: String) {
    if(doer == '')
      return false;
    else
      return true
  }

  checkProject(type: String) {
    if(type == '')
      return false;
    else
      return true
  }

  checkStart(start: String | Date) {
    if(start == '')
      return false;
    else
      return true
  }
  
  checkFinish(finish: String | Date) {
    if(finish == '')
      return false;
    else
      return true
  }
}
