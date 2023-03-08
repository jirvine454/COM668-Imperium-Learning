import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  student_list: any = [];
  page: number = 1;

  constructor(public webService: WebService ) { }

  ngOnInit() {
    this.student_list = this.webService.getStudents(this.page);
    console.log(this.student_list);
  }
}
