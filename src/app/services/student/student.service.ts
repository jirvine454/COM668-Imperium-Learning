import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentID: any;

  constructor(private http: HttpClient) { }

  getStudents(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/students?pn=' + page);
  }

  postStudent(student: any) {
    console.log(student);
    let studentData = new FormData();
    studentData.append("email", student);

    return this.http.post('http://localhost:5000/api/v1.0/students', studentData);
  }

  getStudent(id: any) {
    this.studentID = id;
    return this.http.get('http://localhost:5000/api/v1.0/students/' + id);
  }

  updateStudent(sid: any, student: any) {
    let studentData = new FormData();
    studentData.append("email", student.email);
    studentData.append("name", student.name);
    studentData.append("student_image", student.student_image);

    return this.http.put(
      'http://localhost:5000/api/v1.0/students/' + sid, studentData);
  }
}
