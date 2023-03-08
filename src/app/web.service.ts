import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
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

    searchCourseName(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/courses/searchName/' + name);
    }

    searchCourseYear(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/courses/searchYear/' + name);
    }

    searchCourseCategory(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/courses/searchCourseCategory/' + name);
    }

    getReviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/courses/' + id + '/reviews');
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

    postReview(review: any) {
        console.log(review);
        let postData = new FormData();
        postData.append("name", review.name);
        postData.append("text", review.review);
        postData.append("stars", review.stars);

        let today = new Date();
        let todayDate = today.getFullYear() + "-" +
            today.getMonth() + "-" +
            today.getDate();
        postData.append("date", todayDate);

        return this.http.post('http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews', postData);
    }

    deleteReview(rid: any) {
        return this.http.delete(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid);
    }

    deleteCourse(cid: any) {
        return this.http.delete(
            'http://localhost:5000/api/v1.0/courses/' + cid);
    }

    updateReview(rid: any, review: any) {
        let newData = new FormData();
        newData.append("name", review.name);
        newData.append("text", review.review);
        newData.append("stars", review.stars);

        let today = new Date();
        let todayDate = today.getFullYear() + "-" +
            today.getMonth() + "-" +
            today.getDate();
        newData.append("date", todayDate);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid, newData);
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

    updateFunny(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("funny", review.funny);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid, newVote);
    }

    updateUseful(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("useful", review.useful);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid, newVote);
    }

    updateCool(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("cool", review.cool);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid, newVote);
    }

    updateReviewCount(course: any) {
        let newReviewCount = new FormData();
        newReviewCount.append("review_count", course.review_count);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID, newReviewCount);
    }

    //Assessment Component

    getWDQuestions() {
        return this.http.get<any>("assets/wd-questions.json");
    }

    getFDQuestions() {
        return this.http.get<any>("assets/fd-questions.json");
    }

    getBDQuestions() {
        return this.http.get<any>("assets/bd-questions.json");
    }

    getDDQuestions() {
        return this.http.get<any>("assets/dd-questions.json");
    }

    //Students Component

    getStudents(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/students?pn=' + page);
    }

    postStudent(student: any) {
        console.log(student);
        let studentData = new FormData();
        studentData.append("email", student);

        return this.http.post('http://localhost:5000/api/v1.0/students', studentData);
    }
}