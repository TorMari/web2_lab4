import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckClientFormService {

  constructor() { }

  checkName(name: String) {
    if(name == '')
      return false;
    else
      return true
  }

  checkBudget(budget: Number|String) {
    if(budget == '')
      return false;
    else
      return true
  }
}
