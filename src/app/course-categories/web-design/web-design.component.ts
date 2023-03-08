import { Component } from '@angular/core';
import { WebService } from '.././../web.service';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.css']
})
export class WebDesignComponent {
  course_list: any = [];

  constructor(public webService: WebService ) { }

  ngOnInit(): void {
    this.webService.searchCourseCategory('Web Design').subscribe((response: any) => {
      this.course_list = response;
      console.log(this.course_list);
  });
  }
}
