import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-frontend-development',
  templateUrl: './frontend-development.component.html',
  styleUrls: ['./frontend-development.component.css']
})
export class FrontendDevelopmentComponent {

  course_list: any = [];

  constructor(public courseService: CourseService ) { }

  ngOnInit(): void {
    this.courseService.searchCourseCategory('Frontend Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }

}
