import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http: HttpClient) { }

  getInstructors() {
    return this.http.get('http://localhost:5000/api/v1.0/instructors');
  }

  postInstructor(instructor: any) {
    console.log(instructor);
    let instructorData = new FormData();
    instructorData.append("name", instructor.name);
    instructorData.append("instructor_image", instructor.instructor_image);
    instructorData.append("subject", instructor.subject);
    instructorData.append("teaching_style_quote", instructor.teaching_style_quote);

    return this.http.post('http://localhost:5000/api/v1.0/instructors', instructorData);
  }
}
