import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-backend-development',
  templateUrl: './backend-development.component.html',
  styleUrls: ['./backend-development.component.css']
})
export class BackendDevelopmentComponent {

  course_list: any = [];

  constructor(public courseService: CourseService ) { }

  ngOnInit(): void {
    this.courseService.searchCourseCategory('Backend Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }

}
