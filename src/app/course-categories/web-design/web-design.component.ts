import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.css']
})
export class WebDesignComponent {
  course_list: any = [];

  constructor(public courseService: CourseService ) { }

  ngOnInit(): void {
    this.courseService.searchCourseCategory('Web Design').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }
}
