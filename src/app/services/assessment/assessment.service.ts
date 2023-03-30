import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }

  getWDQuestions() {
    return this.http.get<any>("assets/wd-questions.json");
  }

  getFDQuestions() {
    return this.http.get<any>("assets/fd-questions.json");
  }

  getBDQuestions() {
    return this.http.get<any>("assets/bd-questions.json");
  }

  getDDQuestions() {
    return this.http.get<any>("assets/dd-questions.json");
  }
}
