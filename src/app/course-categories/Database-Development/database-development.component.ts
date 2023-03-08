import { Component } from '@angular/core';
import { WebService } from '.././../web.service';

@Component({
  selector: 'app-database-development',
  templateUrl: './database-development.component.html',
  styleUrls: ['./database-development.component.css']
})
export class DatabaseDevelopmentComponent {

  course_list: any = [];

  constructor(public webService: WebService ) { }

  ngOnInit(): void {
    this.webService.searchCourseCategory('Database Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
    });
  }

}
