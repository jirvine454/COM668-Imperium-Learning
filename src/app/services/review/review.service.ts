import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  private courseID: any;

  getReviews(id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/courses/' + id + '/reviews');
  }

  postReview(review: any, cid: any) {
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

    return this.http.post('http://localhost:5000/api/v1.0/courses/' + cid + '/reviews', postData);
  }

  deleteReview(rid: any, cid: any) {
    return this.http.delete(
      'http://localhost:5000/api/v1.0/courses/' + cid + '/reviews/' + rid);
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
}
