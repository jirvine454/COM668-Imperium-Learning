import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { InstructorService } from 'src/app/services/instructor/instructor.service';
import { CourseService } from 'src/app/services/course/course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {
  courseForm: any;
  instructorForm: any;
  course_list: any = [];
  instructor_list: any = [];
  page: number = 1;

  constructor(public authService: AuthService,
    public instructorService: InstructorService,
    public courseService: CourseService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.course_list = this.courseService.getCourses(this.page);
    this.instructor_list = this.instructorService.getInstructors();

    // Posts new instructor to Mongodb Database
    // if (this.authService.user$) {
    //   this.authService.user$.subscribe((response: any) => {

    //     this.instructorForm = this.formBuilder.group({
    //       name: response.name,
    //       instructor_image: response.picture,
    //       subject: 'Angular Frontend',
    //       teaching_style_quote: 'My learning content abides by WCAG guidelines, ensuring every is student is accommodated for when it comes to disabilities that impact the learning experience.'
    //     });

    //     this.webService.postInstructor(this.instructorForm.value).subscribe((response: any) => {
    //       console.log(response);
    //     });
    //   });
    // }

    this.courseForm = this.formBuilder.group({
      course_title: ['', Validators.required],
      course_category: ['', Validators.required],
      course_image: ['', Validators.required],
      course_description: ['', Validators.required],
      course_difficulty: ['', Validators.required],
      lecturer_name: ['', Validators.required],
      release_year: ['', Validators.required]
    });
  }

  onAddCourse() {
    this.courseService.postCourse(this.courseForm.value).subscribe((response: any) => {
      this.courseForm.reset();
      this.openSnackBar("Course has been successfully added!");
    });
  }

  isUntouched() {
    return this.courseForm.controls.course_title.pristine ||
      this.courseForm.controls.course_category.pristine ||
      this.courseForm.controls.course_image.pristine ||
      this.courseForm.controls.course_description.pristine ||
      this.courseForm.controls.course_difficulty.pristine ||
      this.courseForm.controls.lecturer_name.pristine ||
      this.courseForm.controls.release_year.pristine;
  }

  isInvalid(control: any) {
    return this.courseForm.controls[control].invalid && this.courseForm.controls[control].touched;
  }

  isIncomplete() {
    return this.isInvalid('course_title') ||
      this.isInvalid('course_category') ||
      this.isInvalid('course_image') ||
      this.isInvalid('course_description') ||
      this.isInvalid('course_difficulty') ||
      this.isInvalid('lecturer_name') ||
      this.isInvalid('release_year') ||
      this.isUntouched();
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 5 * 1000 });
  }
}
