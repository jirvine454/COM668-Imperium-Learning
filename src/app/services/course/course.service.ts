import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  course_list: any;
  private courseID: any;

  getCourses(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/courses?pn=' + page);
  }

  getCourseCount() {
    return this.http.get('http://localhost:5000/api/v1.0/courseCount');
  }

  getCourse(id: any) {
    this.courseID = id;
    return this.http.get('http://localhost:5000/api/v1.0/courses/' + id);
  }

  //Search Bar Searchability

  searchCourseName(course_title: any) {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_title=' + course_title);
  }

  //Home Page Searchability

  searchCourseCategory(course_category: any) {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_category=' + course_category);
  }

  //Filter Searchability

  searchCourseDifficulty(difficulty: any) {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_difficulty=' + difficulty);
  }

  searchCourseYear(year: any) {
    return this.http.get('http://localhost:5000/api/v1.0/courses/release_year=' + year);
  }

  searchCourseRating1() {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_rating2.5');
  }

  searchCourseRating2() {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_rating3.5');
  }

  searchCourseRating3() {
    return this.http.get('http://localhost:5000/api/v1.0/courses/course_rating4.5');
  }

  //Sorting Searchability

  sortAscendingOrder() {
    return this.http.get('http://localhost:5000/api/v1.0/courses/ascendingOrder');
  }

  sortDescendingOrder() {
    return this.http.get('http://localhost:5000/api/v1.0/courses/descendingOrder');
  }

  postCourse(course: any) {
    console.log(course);
    let courseData = new FormData();
    courseData.append("course_title", course.course_title);
    courseData.append("course_category", course.course_category);
    courseData.append("course_image", course.course_image);
    courseData.append("course_description", course.course_description);
    courseData.append("course_difficulty", course.course_difficulty);
    courseData.append("lecturer_name", course.lecturer_name);
    courseData.append("release_year", course.release_year);
    console.log(courseData);

    return this.http.post('http://localhost:5000/api/v1.0/courses', courseData);
  }


  deleteCourse(cid: any) {
    return this.http.delete(
      'http://localhost:5000/api/v1.0/courses/' + cid);
  }

  updateCourse(cid: any, course: any) {
    let courseData2 = new FormData();
    courseData2.append("course_title", course.course_title);
    courseData2.append("course_category", course.course_category);
    courseData2.append("course_image", course.course_image);
    courseData2.append("course_description", course.course_description);
    courseData2.append("course_difficulty", course.course_difficulty);
    courseData2.append("lecturer_name", course.lecturer_name);
    courseData2.append("release_year", course.release_year);

    return this.http.put(
      'http://localhost:5000/api/v1.0/courses/' + cid, courseData2);
  }


  updateReviewCount(course: any) {
    let newReviewCount = new FormData();
    newReviewCount.append("review_count", course.review_count);

    return this.http.put(
      'http://localhost:5000/api/v1.0/courses/' + this.courseID, newReviewCount);
  }
}
