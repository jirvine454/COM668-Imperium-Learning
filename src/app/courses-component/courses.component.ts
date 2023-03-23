import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CourseFilters {
    value: string;
  }

interface FiltersGroup {
    disabled?: boolean;
    name: string;
    filter: CourseFilters[];
  }

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
    none: any;

    //mat select dropdown
    filterGroups: FiltersGroup[] = [
        {
            name: 'Difficulty',
            filter: [
                { value: 'Beginner' },
                { value: 'Intermediate' },
                { value: 'Advanced' }
            ],
        },
        {
            name: 'Release Year',
            filter: [
                { value: '2019' },
                { value: '2020' },
                { value: '2021' },
                { value: '2022' }
            ],
        },
        {
            name: 'Rating',
            filter: [
                { value: 'Greater Than Or Equal To 2.5' },
                { value: 'Greater Than Or Equal To 3.5' },
                { value: 'Greater Than Or Equal To 4.5' }
            ],
        },
    ]

    sortGroups: CourseFilters[] = [
        {value: 'Ascending Order'},
        {value: 'Descending Order'}
      ];
    
    constructor(public webService: WebService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page']);
        }

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

    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, { duration: 5 * 1000 });
    }

    searchCourseName(name: any) {
        if (name == "") {
            this.course_list = this.webService.getCourses(this.page);
            this.search_course_list = null;
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
                console.log("Searching by Name...");
                this.course_list = null;
                this.search_course_list = response;
            });
        }
    }

    filterCourses(filter: any) {
        console.log(filter);
        //Reset Filtering
        if (filter == "reset") {
            this.course_list = this.webService.getCourses(this.page);
            this.search_course_list = null;
        }
        //Course Difficulty
        else if (filter == "Beginner") {
            console.log("Searching by Beginner Course Difficulty...");
            this.webService.searchCourseDifficulty(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "Intermediate") {
            console.log("Searching by Intermediate Course Difficulty...");
            this.webService.searchCourseDifficulty(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "Advanced") {
            console.log("Searching by Advanced Course Difficulty...");
            this.webService.searchCourseDifficulty(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }

        //Course Released Year
        else if (filter == "2019") {
            console.log("Searching by 2019 Release Year...");
            this.webService.searchCourseYear(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "2020") {
            console.log("Searching by 2020 Release Year...");
            this.webService.searchCourseYear(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "2021") {
            console.log("Searching by 2021 Release Yeary...");
            this.webService.searchCourseYear(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "2022") {
            console.log("Searching by 2022 Release Year...");
            this.webService.searchCourseYear(filter).subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }

        //Course Rating
        else if (filter == "Greater Than Or Equal To 2.5") {
            console.log("Searching by greater than or equal to 2.5 course rating...");
            this.webService.searchCourseRating1().subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "Greater Than Or Equal To 3.5") {
            console.log("Searching by greater than or equal to 3.5 course rating...");
            this.webService.searchCourseRating2().subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        else if (filter == "Greater Than Or Equal To 4.5") {
            console.log("Searching by greater than or equal to 4.5 course rating...");
            this.webService.searchCourseRating3().subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
    }

    sortCourses(sort: any) {
        console.log(sort);
        //Reset Sorting
        if (sort == "reset") {
            this.course_list = this.webService.getCourses(this.page);
            this.search_course_list = null;
        }
        //Ascending Order
        else if (sort == "Ascending Order") {
            console.log("Sorting Courses by Ascending Order...");
            this.webService.sortAscendingOrder().subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
        //Descending Order
        else if (sort == "Descending Order") {
            console.log("Sorting Courses by Descending Order...");
            this.webService.sortDescendingOrder().subscribe((response: any) => {
                this.course_list = null;
                this.search_course_list = response;
            });
        }
    }
}