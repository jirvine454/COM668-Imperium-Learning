import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-database-development',
  templateUrl: './database-development.component.html',
  styleUrls: ['./database-development.component.css']
})
export class DatabaseDevelopmentComponent {

  course_list: any = [];

  constructor(public courseService: CourseService ) { }

  ngOnInit(): void {
    this.courseService.searchCourseCategory('Database Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
    });
  }

}
