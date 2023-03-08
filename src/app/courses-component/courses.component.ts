import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class CoursesComponent {
    course_list: any = [];
    search_course_list: any = [];
    page: number = 1;
    course_count: any = 0;
    courseForm: any;

    constructor(public webService: WebService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page']);
        }

        this.courseForm = this.formBuilder.group({
            course_title: ['', Validators.required],
            course_category: ['', Validators.required],
            course_image: ['', Validators.required],
            course_description: ['', Validators.required],
            course_difficulty: ['', Validators.required],
            lecturer_name: ['', Validators.required],
            release_year: ['', Validators.required]
        });

        this.course_list = this.webService.getCourses(this.page);

        this.webService.getCourseCount().subscribe(res => { this.course_count = res });
    }

    previousPage() {
        if (this.page > 1) {                             // Unable to go before first page
            this.page = this.page - 1;
            sessionStorage['page'] = this.page;
            this.course_list =
                this.webService.getCourses(this.page);
        }
    }

    selectPage(pageNum: number) {
        this.page = pageNum;
        sessionStorage['page'] = this.page;
        this.course_list =
            this.webService.getCourses(this.page);
    }

    lastPage() {
        console.log(this.course_count);
        this.page = this.course_count / 10;
        console.log("Total Number of Course Documents: " + this.course_count + " meaning last page is " + this.page);
        sessionStorage['page'] = this.page;
        this.course_list =
            this.webService.getCourses(this.page);
    }

    nextPage() {
        let lastPage = this.course_count / 10;

        if (this.page < lastPage) {                         // Unable to go past last page
            this.page = this.page + 1;
            sessionStorage['page'] = this.page;
            this.course_list =
                this.webService.getCourses(this.page);
        }
    }

    selectCustomPage(page: any) {
        this.page = page;
        sessionStorage['page'] = this.page;
        this.course_list =
            this.webService.getCourses(this.page);
    }

    onAddCourse() {
        this.webService.postCourse(this.courseForm.value).subscribe((response: any) => {
            this.courseForm.reset();
            this.course_list = this.webService.getCourses(this.page);
            this.openSnackBar("Course has been successfully added!");
        });
    }

    isInvalid(control: any) {
        return this.courseForm.controls[control].invalid && this.courseForm.controls[control].touched;
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

    searchCourse(name: any) {
        console.log(name + "Hello!")
        if (name == "") {
            this.course_list = this.webService.getCourses(this.page);
            this.search_course_list = null;
        }
        else if (name.startsWith("1") || name.startsWith("2")) {
            console.log("Searching by Year...");
            this.webService.searchCourseYear(name).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (name == "Database Development" || name == "Frontend Development" || name == "Backend Development" || name == "Web Design") {
            console.log("Searching by Category...");
            this.webService.searchCourseCategory(name).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else {
            this.webService.searchCourseName(name).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
    }
}