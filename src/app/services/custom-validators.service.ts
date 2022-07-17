import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  //TODO replace with regex

  isSurveyIdValid(id: string): boolean{
    return  id && id.length === 6 && this.isNumeric(id);
  }

  isQuestionIdValid(id: string): boolean{
    return id && id.length === 8 && this.isNumeric(id);
  }

  isNumeric(str: string) {
    return !isNaN(+str)
  }
}
