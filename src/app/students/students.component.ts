import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  student_list: any = [];
  page: number = 1;

  constructor(public studentService: StudentService ) { }

  ngOnInit() {
    this.student_list = this.studentService.getStudents(this.page);
    console.log(this.student_list);
  }
}
