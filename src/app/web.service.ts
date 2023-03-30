import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    constructor(private http: HttpClient) { }

    course_list: any;
    private courseID: any;
    private studentID: any;

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
        // Have to increase current month by 1 a there is a bug with getMonth() as it is one behind
        // currenty month, for examplke running getMonth() in March would return 2 which is February
        let month = today.getMonth();
        ++month;
        let todayDate = today.getFullYear() + "-" +
            month + "-" +
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

    updateLike(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("like", review.like);

        return this.http.put(
            'http://localhost:5000/api/v1.0/courses/' + this.courseID + '/reviews/' + rid, newVote);
    }

    updateDislike(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("dislike", review.dislike);

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

    getStudent(id: any) {
        this.studentID = id;
        return this.http.get('http://localhost:5000/api/v1.0/students/' + id);
    }

    updateStudent(sid: any, student: any) {
        let studentData = new FormData();
        studentData.append("email", student.email);
        studentData.append("name", student.name);
        studentData.append("student_image", student.student_image);

        return this.http.put(
            'http://localhost:5000/api/v1.0/students/' + sid, studentData);
    }

    //Instructor Component

    getInstructors() {
        return this.http.get('http://localhost:5000/api/v1.0/instructors');
    }

    postInstructor(instructor: any) {
        console.log(instructor);
        let instructorData = new FormData();
        instructorData.append("name", instructor.name);
        instructorData.append("instructor_image", instructor.instructor_image);
        instructorData.append("subject", instructor.subject);
        instructorData.append("teaching_style_quote", instructor.teaching_style_quote);

        return this.http.post('http://localhost:5000/api/v1.0/instructors', instructorData);
    }
}