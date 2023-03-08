import { Component } from '@angular/core';
import { WebService } from '.././../web.service';

@Component({
  selector: 'app-frontend-development',
  templateUrl: './frontend-development.component.html',
  styleUrls: ['./frontend-development.component.css']
})
export class FrontendDevelopmentComponent {

  course_list: any = [];

  constructor(public webService: WebService ) { }

  ngOnInit(): void {
    this.webService.searchCourseCategory('Frontend Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }

}
