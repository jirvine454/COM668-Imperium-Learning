import { Component } from '@angular/core';
import { WebService } from '.././../web.service';

@Component({
  selector: 'app-backend-development',
  templateUrl: './backend-development.component.html',
  styleUrls: ['./backend-development.component.css']
})
export class BackendDevelopmentComponent {

  course_list: any = [];

  constructor(public webService: WebService ) { }

  ngOnInit(): void {
    this.webService.searchCourseCategory('Backend Development').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }

}
